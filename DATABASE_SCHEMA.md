
# Car Wash Management System - Database Schema

## Overview
This document outlines the complete database schema required for the Car Wash Management System. The schema is designed to support user management, subscription handling, car registration, appointment scheduling, notifications, and feedback management.

## Database Tables

### 1. Users Table
Stores user account information and subscription details.

```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    join_date DATE NOT NULL,
    subscription_type ENUM('basic', 'premium', 'luxury') DEFAULT 'basic',
    subscription_duration ENUM('1-month', '6-month', '1-year') DEFAULT '1-month',
    subscription_start_date DATE,
    subscription_end_date DATE,
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Cars Table
Stores information about user vehicles.

```sql
CREATE TABLE cars (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    added_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_license_plate (license_plate)
);
```

### 3. Appointments Table
Manages car wash appointments and scheduling.

```sql
CREATE TABLE appointments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    car_id VARCHAR(36) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    service_type ENUM('basic', 'premium', 'luxury') NOT NULL,
    wash_type VARCHAR(100) NOT NULL,
    status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    price DECIMAL(8, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_car_id (car_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
);
```

### 4. Notifications Table
Manages system notifications sent to users.

```sql
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36), -- NULL for system-wide notifications
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('reminder', 'promotion', 'system', 'appointment') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);
```

### 5. Feedback Table
Stores user feedback and ratings for services.

```sql
CREATE TABLE feedback (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    appointment_id VARCHAR(36), -- Optional reference to specific appointment
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    service_type VARCHAR(100) NOT NULL,
    feedback_date DATE NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    admin_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_rating (rating),
    INDEX idx_feedback_date (feedback_date),
    INDEX idx_is_approved (is_approved)
);
```

### 6. Subscription Plans Table
Manages available subscription plans and pricing.

```sql
CREATE TABLE subscription_plans (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('basic', 'premium', 'luxury') UNIQUE NOT NULL,
    monthly_price DECIMAL(8, 2) NOT NULL,
    description TEXT,
    features JSON, -- Store array of features
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_is_active (is_active)
);
```

### 7. Payments Table
Tracks payment transactions and billing history.

```sql
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    appointment_id VARCHAR(36), -- NULL for subscription payments
    subscription_id VARCHAR(36), -- NULL for appointment payments
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'cash') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(255), -- External payment processor ID
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_payment_date (payment_date)
);
```

### 8. System Settings Table
Stores application configuration and settings.

```sql
CREATE TABLE system_settings (
    id VARCHAR(36) PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Whether setting can be viewed by non-admin users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);
```

### 9. User Sessions Table
Manages user authentication sessions.

```sql
CREATE TABLE user_sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active)
);
```

### 10. Audit Log Table
Tracks important system actions for security and debugging.

```sql
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36), -- NULL for system actions
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id VARCHAR(36),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table_name (table_name),
    INDEX idx_created_at (created_at)
);
```

## Initial Data Setup

### Default Subscription Plans
```sql
INSERT INTO subscription_plans (id, name, type, monthly_price, description, features) VALUES
('basic-plan-1', 'Basic Wash', 'basic', 29.99, 'Essential car wash service', 
 JSON_ARRAY('Exterior wash', 'Basic interior cleaning', 'Tire cleaning', '1 wash per week')),
('premium-plan-1', 'Premium Clean', 'premium', 49.99, 'Complete car cleaning service', 
 JSON_ARRAY('Everything in Basic', 'Interior detailing', 'Wax protection', 'Wheel cleaning', '2 washes per week')),
('luxury-plan-1', 'Luxury Detailing', 'luxury', 89.99, 'Premium detailing and protection', 
 JSON_ARRAY('Everything in Premium', 'Paint protection', 'Leather treatment', 'Engine cleaning', 'Unlimited washes'));
```

### Default System Settings
```sql
INSERT INTO system_settings (id, setting_key, setting_value, setting_type, description, is_public) VALUES
('setting-1', 'business_name', 'AquaClean Car Wash', 'string', 'Business name', true),
('setting-2', 'business_email', 'admin@aquaclean.com', 'string', 'Business contact email', true),
('setting-3', 'business_phone', '+1 (555) 000-0000', 'string', 'Business contact phone', true),
('setting-4', 'max_daily_appointments', '50', 'number', 'Maximum appointments per day', false),
('setting-5', 'email_notifications_enabled', 'true', 'boolean', 'Enable email notifications', false),
('setting-6', 'sms_notifications_enabled', 'false', 'boolean', 'Enable SMS notifications', false),
('setting-7', 'session_timeout_minutes', '60', 'number', 'User session timeout in minutes', false);
```

## Database Indexes for Performance

### Additional Composite Indexes
```sql
-- For appointment scheduling queries
CREATE INDEX idx_appointments_date_time ON appointments(appointment_date, appointment_time);

-- For user subscription queries
CREATE INDEX idx_users_subscription ON users(subscription_type, status, subscription_end_date);

-- For notification queries
CREATE INDEX idx_notifications_user_type ON notifications(user_id, type, is_read);

-- For payment history queries
CREATE INDEX idx_payments_user_date ON payments(user_id, payment_date);

-- For car search queries
CREATE INDEX idx_cars_make_model ON cars(make, model);
```

## Database Constraints and Triggers

### Trigger for Updating User Total Spent
```sql
DELIMITER //
CREATE TRIGGER update_user_total_spent 
AFTER INSERT ON payments 
FOR EACH ROW
BEGIN
    IF NEW.payment_status = 'completed' THEN
        UPDATE users 
        SET total_spent = total_spent + NEW.amount 
        WHERE id = NEW.user_id;
    END IF;
END//
DELIMITER ;
```

### Trigger for Audit Logging
```sql
DELIMITER //
CREATE TRIGGER audit_user_changes 
AFTER UPDATE ON users 
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (id, user_id, action, table_name, record_id, old_values, new_values)
    VALUES (UUID(), NEW.id, 'UPDATE', 'users', NEW.id, 
            JSON_OBJECT('name', OLD.name, 'email', OLD.email, 'subscription_type', OLD.subscription_type),
            JSON_OBJECT('name', NEW.name, 'email', NEW.email, 'subscription_type', NEW.subscription_type));
END//
DELIMITER ;
```

## Data Types and Storage Considerations

1. **IDs**: Using VARCHAR(36) for UUIDs to ensure uniqueness across distributed systems
2. **Timestamps**: Using TIMESTAMP for timezone-aware storage
3. **Money**: Using DECIMAL(10,2) for precise monetary calculations
4. **JSON**: Using JSON fields for flexible feature lists and configuration storage
5. **Enums**: Using ENUM for predefined values to ensure data consistency

## Security Considerations

1. **Password Storage**: Store hashed passwords, never plain text
2. **Session Management**: Implement secure session handling with expiration
3. **Data Encryption**: Consider encrypting sensitive fields like payment information
4. **Access Control**: Implement role-based access control (RBAC)
5. **Audit Trail**: Maintain comprehensive audit logs for compliance

## Backup and Maintenance

1. **Regular Backups**: Implement daily automated backups
2. **Data Retention**: Set policies for old data cleanup (sessions, logs)
3. **Index Maintenance**: Regularly analyze and optimize database indexes
4. **Monitoring**: Set up monitoring for database performance and storage

This schema provides a solid foundation for the car wash management system with room for future expansion and optimization.
