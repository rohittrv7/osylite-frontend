# Implementation Plan: School Management System Enhancements

## Overview

This document outlines the implementation tasks for enhancing the School Management System with four major feature sets:

1. **Multi-Child Parent Account System**: Enables parents to manage multiple children through a single account
2. **Manual Fee Management System**: Comprehensive fee structure configuration, payment submission, and approval workflow
3. **Library Management System**: Complete book catalog, issue/return tracking, fines, and reservations
4. **Security & Optimization**: Enhanced RBAC, encryption, caching, rate limiting, and performance optimizations

The implementation follows a modular approach, building each feature incrementally with proper testing and validation at each checkpoint.

## Tasks

### Phase 1: Foundation and Security Infrastructure

- [-] 1. Set up security and encryption infrastructure
  - [ ] 1.1 Create encryption service module
    - Implement AES-256-GCM encryption service in `school backend/src/modules/security/services/encryption.service.ts`
    - Add encrypt() and decrypt() methods with IV and auth tag handling
    - Configure encryption key from environment variables
    - _Requirements: 22.1, 22.2, 22.3, 22.7_
  
  - [ ]* 1.2 Write property test for encryption round-trip
    - **Property 5: Encryption Round-Trip**
    - **Validates: Requirements 22.1, 22.2**
  
  - [ ] 1.3 Create audit logging service
    - Implement audit log service in `school backend/src/modules/security/services/audit-log.service.ts`
    - Create AuditLog entity with immutability protection
    - Add methods for logging authentication, authorization, and critical operations
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.10_
  
  - [ ] 1.4 Implement JWT token service enhancements
    - Create token service in `school backend/src/modules/security/services/token.service.ts`
    - Implement RS256 token generation with proper payload structure
    - Add refresh token generation and validation
    - Implement token blacklist using Redis
    - _Requirements: 26.1, 26.2, 26.3, 26.4, 26.8, 26.9_
  
  - [ ]* 1.5 Write property test for JWT token contents
    - **Property 7: Authentication Token Contents**
    - **Validates: Requirements 2.1, 2.2**

- [ ] 2. Implement RBAC and authorization guards
  - [ ] 2.1 Create enhanced roles and permissions system
    - Define Role enum and Permission enum in `school backend/src/modules/security/enums/`
    - Create permission matrix mapping roles to permissions
    - _Requirements: 21.1, 21.2, 21.4_
  
  - [ ] 2.2 Implement RolesGuard with permission checking
    - Create RolesGuard in `school backend/src/modules/security/guards/roles.guard.ts`
    - Implement permission validation using reflector
    - Add @Permissions decorator
    - _Requirements: 21.3, 21.11_
  
  - [ ] 2.3 Implement SchoolIsolationGuard
    - Create SchoolIsolationGuard in `school backend/src/modules/security/guards/school-isolation.guard.ts`
    - Validate school ID from JWT matches requested resource school
    - Allow Super Admin to bypass isolation
    - _Requirements: 31.5, 31.6, 31.10_
  
  - [ ]* 2.4 Write property test for permission-based access control
    - **Property 36: Permission-Based Access Control**
    - **Validates: Requirements 21.3**
  
  - [ ]* 2.5 Write property test for cross-school data isolation
    - **Property 37: Cross-School Data Isolation**
    - **Validates: Requirements 31.5**

- [ ] 3. Implement rate limiting and caching infrastructure
  - [ ] 3.1 Set up Redis connection and configuration
    - Configure Redis client in app module
    - Set up connection pooling and error handling
    - _Requirements: 24.11, 29.1_
  
  - [ ] 3.2 Create rate limiting guard
    - Implement RateLimitGuard in `school backend/src/modules/security/guards/rate-limit.guard.ts`
    - Use Redis for sliding window rate limiting
    - Configure different limits for different endpoints
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.7_
  
  - [ ]* 3.3 Write property test for rate limiting enforcement
    - **Property 9: Rate Limiting Enforcement**
    - **Validates: Requirements 2.4, 24.1, 24.3**
  
  - [ ] 3.4 Create caching service
    - Implement CacheService in `school backend/src/modules/security/services/cache.service.ts`
    - Add get, set, invalidate methods with TTL support
    - Implement cache key namespacing by school
    - _Requirements: 29.1, 29.7, 29.8_
  
  - [ ]* 3.5 Write property test for dashboard caching behavior
    - **Property 15: Dashboard Caching Behavior**
    - **Validates: Requirements 3.10**

- [ ] 4. Checkpoint - Security infrastructure validation
  - Run all security-related tests
  - Verify encryption, JWT, RBAC, rate limiting, and caching work correctly
  - Ensure all tests pass, ask the user if questions arise.

### Phase 2: Parent Account System

- [ ] 5. Create parent module data layer
  - [ ] 5.1 Create Parent entity
    - Define Parent entity in `school backend/src/modules/parents/entities/parent.entity.ts`
    - Add encrypted email and phone fields with transformation
    - Add indexes on email and phone
    - _Requirements: 1.1, 1.2, 1.6, 1.8_
  
  - [ ] 5.2 Create ParentStudent relationship entity
    - Define ParentStudent entity in `school backend/src/modules/parents/entities/parent-student.entity.ts`
    - Add composite unique constraint on parentId and studentId
    - Add foreign key constraints with CASCADE on parent delete
    - _Requirements: 1.3, 1.4, 1.5, 1.7_
  
  - [ ]* 5.3 Write property test for parent account creation completeness
    - **Property 1: Parent Account Creation Completeness**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ]* 5.4 Write property test for email uniqueness constraint
    - **Property 4: Email Uniqueness Constraint**
    - **Validates: Requirements 1.6**

- [ ] 6. Implement parent service and DTOs
  - [ ] 6.1 Create parent DTOs
    - Create CreateParentDto, UpdateParentDto, LinkStudentDto in `school backend/src/modules/parents/dto/`
    - Add validation decorators for email format, phone format, required fields
    - _Requirements: 1.9, 1.10, 25.1, 25.2, 25.4, 25.5_
  
  - [ ] 6.2 Implement ParentService
    - Create ParentService in `school backend/src/modules/parents/parents.service.ts`
    - Implement create, update, delete, findOne, findAll methods
    - Implement linkStudent and unlinkStudent methods
    - Hash passwords using bcrypt before storage
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7, 2.10_
  
  - [ ]* 6.3 Write property test for parent-student linking cardinality
    - **Property 2: Parent-Student Linking Cardinality**
    - **Validates: Requirements 1.3, 1.4**
  
  - [ ]* 6.4 Write property test for unlinking preserves records
    - **Property 3: Unlinking Preserves Records**
    - **Validates: Requirements 1.5, 1.7**
  
  - [ ]* 6.5 Write unit tests for parent service
    - Test create parent with valid data
    - Test create parent with duplicate email fails
    - Test link/unlink student operations
    - Test delete parent preserves students

- [ ] 7. Implement parent authentication
  - [ ] 7.1 Add parent authentication to auth module
    - Extend existing auth service to support parent role
    - Implement parent login endpoint in auth controller
    - Generate JWT with parent role and linked student IDs
    - _Requirements: 2.1, 2.2, 2.9_
  
  - [ ] 7.2 Implement ParentAccessGuard
    - Create ParentAccessGuard in `school backend/src/modules/parents/guards/parent-access.guard.ts`
    - Validate parent can only access linked children's data
    - Return 403 for non-linked student access attempts
    - _Requirements: 2.7, 2.8_
  
  - [ ]* 7.3 Write property test for authentication error uniformity
    - **Property 8: Authentication Error Uniformity**
    - **Validates: Requirements 2.3**
  
  - [ ]* 7.4 Write property test for parent data access authorization
    - **Property 11: Parent Data Access Authorization**
    - **Validates: Requirements 2.7, 2.8, 3.4**

- [ ] 8. Implement parent controller and API endpoints
  - [ ] 8.1 Create ParentController
    - Implement CRUD endpoints in `school backend/src/modules/parents/parents.controller.ts`
    - Add POST /api/parents, GET /api/parents, GET /api/parents/:id
    - Add PATCH /api/parents/:id, DELETE /api/parents/:id
    - Apply RolesGuard with appropriate permissions
    - _Requirements: 1.1, 1.2_
  
  - [ ] 8.2 Implement parent-student relationship endpoints
    - Add POST /api/parents/:id/students (link student)
    - Add DELETE /api/parents/:id/students/:studentId (unlink)
    - Add GET /api/parents/:id/students (get linked students)
    - _Requirements: 1.3, 1.4, 1.5_
  
  - [ ] 8.3 Implement parent dashboard endpoint
    - Add GET /api/parent/dashboard endpoint
    - Return list of linked children with name, class, section, roll number
    - Implement caching with 5-minute TTL
    - _Requirements: 3.1, 3.2, 3.4, 3.6, 3.7, 3.10_
  
  - [ ]* 8.4 Write property test for dashboard children list completeness
    - **Property 13: Dashboard Children List Completeness**
    - **Validates: Requirements 3.1, 3.2, 3.6**
  
  - [ ]* 8.5 Write property test for dashboard count consistency
    - **Property 14: Dashboard Count Consistency**
    - **Validates: Requirements 3.7**

- [ ] 9. Implement parent access to student data
  - [ ] 9.1 Create endpoints for parent to view child attendance
    - Add GET /api/parent/children/:id/attendance endpoint
    - Integrate with existing attendance module
    - Apply ParentAccessGuard to validate parent-child relationship
    - Implement pagination and date range filtering
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.8_
  
  - [ ] 9.2 Create endpoints for parent to view announcements and schedules
    - Add GET /api/parent/children/:id/announcements endpoint
    - Add GET /api/parent/children/:id/schedule endpoint
    - Integrate with existing announcements and schedules modules
    - Filter announcements by child's class and school-wide
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.10_

- [ ] 10. Checkpoint - Parent account system validation
  - Test parent account creation, linking, and authentication
  - Verify parent can access only linked children's data
  - Test dashboard caching and performance
  - Ensure all tests pass, ask the user if questions arise.

### Phase 3: Fee Management System

- [ ] 11. Create fee management data layer
  - [ ] 11.1 Create FeeStructure entity
    - Define FeeStructure entity in `school backend/src/modules/fees/entities/fee-structure.entity.ts`
    - Add JSONB fields for feeTypes, lateFee, discount, installments
    - Add validation for at least one fee type
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.11_
  
  - [ ] 11.2 Create FeeRecord entity
    - Define FeeRecord entity in `school backend/src/modules/fees/entities/fee-record.entity.ts`
    - Add fields for totalAmount, paidAmount, discountAmount, dueDate, status
    - Add indexes on studentId, status, dueDate
    - _Requirements: 7.3, 7.4, 7.5_
  
  - [ ] 11.3 Create PaymentSubmission entity
    - Define PaymentSubmission entity in `school backend/src/modules/fees/entities/payment-submission.entity.ts`
    - Add encrypted paymentProofUrl field
    - Add fields for amount, lateFeeAmount, status, rejectionReason
    - _Requirements: 8.6, 8.7, 8.9, 8.11, 8.12_
  
  - [ ] 11.4 Create FeeReceipt entity
    - Define FeeReceipt entity in `school backend/src/modules/fees/entities/fee-receipt.entity.ts`
    - Add unique receiptNumber field
    - Add JSONB field for receiptData
    - _Requirements: 10.1, 10.2, 10.5_

- [ ] 12. Implement fee structure management
  - [ ] 12.1 Create fee structure DTOs
    - Create CreateFeeStructureDto, UpdateFeeStructureDto in `school backend/src/modules/fees/dto/`
    - Add validation for fee types, amounts, frequency, installments
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.8, 6.12_
  
  - [ ] 12.2 Implement FeeService for structure management
    - Create FeeService in `school backend/src/modules/fees/fees.service.ts`
    - Implement create, update, delete, findAll methods for fee structures
    - Prevent deletion of structures with associated fee records
    - _Requirements: 6.1, 6.9, 6.10_
  
  - [ ]* 12.3 Write property test for fee structure creation validation
    - **Property 16: Fee Structure Creation Validation**
    - **Validates: Requirements 6.8**
  
  - [ ]* 12.4 Write property test for fee structure deletion protection
    - **Property 17: Fee Structure Deletion Protection**
    - **Validates: Requirements 6.10**

- [ ] 13. Implement fee assignment functionality
  - [ ] 13.1 Create fee assignment DTOs
    - Create AssignFeeDto, BulkAssignFeeDto in `school backend/src/modules/fees/dto/`
    - Add validation for studentId, feeStructureId, dueDate
    - _Requirements: 7.1, 7.2_
  
  - [ ] 13.2 Implement fee calculation service
    - Create FeeCalculationService in `school backend/src/modules/fees/services/fee-calculation.service.ts`
    - Implement calculateTotal method with discounts and installments
    - Implement calculateLateFee method
    - _Requirements: 7.4, 7.5, 8.11, 8.12_
  
  - [ ] 13.3 Implement fee assignment methods in FeeService
    - Add assignFee method for individual student
    - Add bulkAssignFee method for class with transaction support
    - Prevent duplicate fee assignments for same period
    - Generate installment schedule if configured
    - _Requirements: 7.1, 7.2, 7.3, 7.6, 7.7, 7.9, 7.10, 7.11_
  
  - [ ]* 13.4 Write property test for fee assignment creates record
    - **Property 18: Fee Assignment Creates Record**
    - **Validates: Requirements 7.1, 7.3**
  
  - [ ]* 13.5 Write property test for duplicate fee assignment prevention
    - **Property 19: Duplicate Fee Assignment Prevention**
    - **Validates: Requirements 7.7**
  
  - [ ]* 13.6 Write property test for bulk fee assignment atomicity
    - **Property 20: Bulk Fee Assignment Atomicity**
    - **Validates: Requirements 7.9**
  
  - [ ]* 13.7 Write property test for late fee calculation
    - **Property 24: Late Fee Calculation**
    - **Validates: Requirements 8.11, 8.12**

- [ ] 14. Implement payment submission workflow
  - [ ] 14.1 Create payment submission DTOs
    - Create SubmitPaymentDto, ApprovePaymentDto, RejectPaymentDto in `school backend/src/modules/fees/dto/`
    - Add file upload validation for payment proof
    - _Requirements: 8.3, 8.4, 8.5, 8.9_
  
  - [ ] 14.2 Implement file upload validation pipe
    - Create FileValidationPipe in `school backend/src/modules/security/pipes/file-validation.pipe.ts`
    - Validate file size (max 5MB), MIME type (JPEG/PNG/PDF), extension
    - _Requirements: 8.3, 8.4, 8.5, 27.1, 27.2, 27.3_
  
  - [ ] 14.3 Implement payment submission methods in FeeService
    - Add submitPayment method for parents
    - Upload payment proof to cloud storage with encryption
    - Create PaymentSubmission with "Pending" status
    - Calculate and add late fees if applicable
    - Prevent submission for already approved payments
    - _Requirements: 8.1, 8.2, 8.6, 8.7, 8.8, 8.9, 8.10, 8.11, 8.12_
  
  - [ ]* 14.4 Write property test for payment file upload validation
    - **Property 21: Payment File Upload Validation**
    - **Validates: Requirements 8.3, 8.4**
  
  - [ ]* 14.5 Write property test for payment submission initial state
    - **Property 22: Payment Submission Initial State**
    - **Validates: Requirements 8.6**
  
  - [ ]* 14.6 Write property test for approved payment immutability
    - **Property 23: Approved Payment Immutability**
    - **Validates: Requirements 8.10, 9.10**

- [ ] 15. Implement payment approval workflow
  - [ ] 15.1 Implement payment approval methods in FeeService
    - Add approvePayment method for Principal/Staff
    - Update PaymentSubmission status to "Approved"
    - Mark associated FeeRecord as paid
    - Update payment date to approval date
    - Prevent modification after approval
    - _Requirements: 9.1, 9.4, 9.5, 9.10, 9.12_
  
  - [ ] 15.2 Implement payment rejection methods
    - Add rejectPayment method with rejection reason
    - Update PaymentSubmission status to "Rejected"
    - Allow parent to resubmit after rejection
    - _Requirements: 9.6, 9.7, 9.11_
  
  - [ ]* 15.3 Write property test for payment approval state transition
    - **Property 25: Payment Approval State Transition**
    - **Validates: Requirements 9.5**

- [ ] 16. Implement receipt generation
  - [ ] 16.1 Create receipt generation service
    - Create ReceiptGenerationService in `school backend/src/modules/fees/services/receipt-generation.service.ts`
    - Implement generateReceipt method to create PDF
    - Generate unique receipt number
    - Include all required receipt details
    - _Requirements: 10.1, 10.2, 10.4, 10.7, 10.8, 10.9_
  
  - [ ] 16.2 Integrate receipt generation with payment approval
    - Automatically generate receipt on payment approval
    - Store receipt URL in PaymentSubmission
    - Allow regeneration if needed
    - _Requirements: 10.1, 10.5, 10.6, 10.10_
  
  - [ ]* 16.3 Write property test for receipt generation uniqueness
    - **Property 26: Receipt Generation Uniqueness**
    - **Validates: Requirements 10.1**
  
  - [ ]* 16.4 Write property test for receipt URL storage
    - **Property 27: Receipt URL Storage**
    - **Validates: Requirements 10.5**

- [ ] 17. Implement fee management API endpoints
  - [ ] 17.1 Create fee structure endpoints
    - Add POST /api/fees/structures, GET /api/fees/structures
    - Add GET /api/fees/structures/:id, PATCH /api/fees/structures/:id
    - Add DELETE /api/fees/structures/:id
    - Apply RolesGuard with FEE_STRUCTURE_CREATE permission
    - _Requirements: 6.1, 6.9_
  
  - [ ] 17.2 Create fee assignment endpoints
    - Add POST /api/fees/assign (individual assignment)
    - Add POST /api/fees/assign/bulk (bulk assignment)
    - Add GET /api/fees/records (list fee records with pagination)
    - _Requirements: 7.1, 7.2, 7.12_
  
  - [ ] 17.3 Create payment submission endpoints for parents
    - Add POST /api/fees/payments/submit (with file upload)
    - Add GET /api/fees/payments/my (parent's submissions)
    - Add GET /api/fees/payments/:id (payment details)
    - Apply ParentAccessGuard
    - _Requirements: 8.1, 8.2_
  
  - [ ] 17.4 Create payment approval endpoints for staff
    - Add GET /api/fees/payments/pending (list pending payments)
    - Add PATCH /api/fees/payments/:id/approve
    - Add PATCH /api/fees/payments/:id/reject
    - Apply RolesGuard with PAYMENT_APPROVE permission
    - _Requirements: 9.1, 9.2, 9.4, 9.6_
  
  - [ ] 17.5 Create receipt download endpoint
    - Add GET /api/fees/receipts/:id (download receipt PDF)
    - Validate user authorization before serving
    - _Requirements: 10.3, 10.10_

- [ ] 18. Implement fee reports and analytics
  - [ ] 18.1 Create fee report service
    - Create report methods in FeeService for collection summary, class-wise breakdown, defaulters list
    - Implement caching with 1-hour TTL
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.11, 11.12_
  
  - [ ] 18.2 Create fee report endpoints
    - Add GET /api/fees/reports/collection
    - Add GET /api/fees/reports/defaulters
    - Add GET /api/fees/reports/class-wise
    - Support PDF and CSV export
    - _Requirements: 11.6, 11.7, 11.8, 11.9, 11.10_

- [ ] 19. Implement payment reminder system
  - [ ] 19.1 Create payment reminder service
    - Create PaymentReminderService in `school backend/src/modules/fees/services/payment-reminder.service.ts`
    - Implement methods to identify upcoming and overdue fees
    - Integrate with notification system
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.8, 12.9, 12.10_
  
  - [ ] 19.2 Create scheduled job for automatic reminders
    - Set up cron job to run daily
    - Send reminders for fees due within 7 days
    - Send overdue notifications
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 20. Checkpoint - Fee management system validation
  - Test fee structure creation and assignment
  - Test payment submission, approval, and rejection workflows
  - Test receipt generation and download
  - Verify fee reports and reminders work correctly
  - Ensure all tests pass, ask the user if questions arise.

### Phase 4: Library Management System

- [ ] 21. Create library management data layer
  - [ ] 21.1 Create Book entity
    - Define Book entity in `school backend/src/modules/library/entities/book.entity.ts`
    - Add fields for ISBN, title, author, publisher, category, quantities
    - Add unique constraint on ISBN and check constraints on quantities
    - Add indexes on ISBN, title, author, category
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.6, 13.7_
  
  - [ ] 21.2 Create BookIssue entity
    - Define BookIssue entity in `school backend/src/modules/library/entities/book-issue.entity.ts`
    - Add fields for issueId, bookId, studentId, issueDate, dueDate, status
    - Add indexes on bookId, studentId, status, dueDate
    - _Requirements: 15.3, 15.4, 15.10_
  
  - [ ] 21.3 Create BookReturn entity
    - Define BookReturn entity in `school backend/src/modules/library/entities/book-return.entity.ts`
    - Add fields for returnDate, condition, lateFine, damageFine
    - _Requirements: 16.3, 16.5, 16.7, 16.8, 16.9_
  
  - [ ] 21.4 Create Fine entity
    - Define Fine entity in `school backend/src/modules/library/entities/fine.entity.ts`
    - Add fields for studentId, amount, reason, status
    - Add indexes on studentId and status
    - _Requirements: 17.1, 17.2, 17.3_
  
  - [ ] 21.5 Create Reservation entity
    - Define Reservation entity in `school backend/src/modules/library/entities/reservation.entity.ts`
    - Add fields for bookId, studentId, queuePosition, status
    - Add indexes on bookId, studentId, status
    - _Requirements: 18.2, 18.3_

- [ ] 22. Implement book catalog management
  - [ ] 22.1 Create book DTOs
    - Create CreateBookDto, UpdateBookDto, BookSearchDto in `school backend/src/modules/library/dto/`
    - Add validation for ISBN format, required fields
    - _Requirements: 13.1, 13.2_
  
  - [ ] 22.2 Implement BookCatalogService
    - Create BookCatalogService in `school backend/src/modules/library/services/book-catalog.service.ts`
    - Implement create, update, archive methods
    - Prevent duplicate ISBN entries
    - Implement search with filters and pagination
    - _Requirements: 13.1, 13.6, 13.7, 13.8, 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8_
  
  - [ ]* 22.3 Write property test for ISBN validation and uniqueness
    - **Property 28: ISBN Validation and Uniqueness**
    - **Validates: Requirements 13.2, 13.6**
  
  - [ ] 22.3 Implement bulk book import
    - Add importBooksFromCSV method
    - Validate CSV format and data
    - Use transaction for atomic import
    - _Requirements: 13.10, 13.11, 13.12_

- [ ] 23. Implement book issue process
  - [ ] 23.1 Create book issue DTOs
    - Create IssueBookDto in `school backend/src/modules/library/dto/`
    - Add validation for bookId, studentId
    - _Requirements: 15.1_
  
  - [ ] 23.2 Implement IssueReturnService for book issues
    - Create IssueReturnService in `school backend/src/modules/library/services/issue-return.service.ts`
    - Implement issueBook method with availability check
    - Verify book quantity > 0 before issue
    - Enforce maximum 3 books per student limit
    - Prevent issue if student has overdue books
    - Prevent issue if student has fines > 100
    - Decrement available quantity on issue
    - Calculate due date as 14 days from issue
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 15.11_
  
  - [ ]* 23.3 Write property test for book issue availability check
    - **Property 29: Book Issue Availability Check**
    - **Validates: Requirements 15.2**
  
  - [ ]* 23.4 Write property test for book issue quantity decrement
    - **Property 30: Book Issue Quantity Decrement**
    - **Validates: Requirements 15.5**
  
  - [ ]* 23.5 Write property test for student borrowing limit
    - **Property 31: Student Borrowing Limit**
    - **Validates: Requirements 15.6, 15.7**
  
  - [ ]* 23.6 Write property test for book quantity invariant
    - **Property 43: Book Quantity Invariant**
    - **Validates: Requirement invariant**

- [ ] 24. Implement book return process
  - [ ] 24.1 Create book return DTOs
    - Create ReturnBookDto in `school backend/src/modules/library/dto/`
    - Add validation for issueId, condition
    - _Requirements: 16.1, 16.7_
  
  - [ ] 24.2 Implement FineCalculationService
    - Create FineCalculationService in `school backend/src/modules/library/services/fine-calculation.service.ts`
    - Implement calculateLateFine method (5 per day)
    - Implement calculateDamageFine method
    - _Requirements: 16.5, 16.6, 16.8, 16.9_
  
  - [ ] 24.3 Implement book return methods in IssueReturnService
    - Add returnBook method
    - Verify BookIssue exists and is active
    - Create BookReturn record
    - Increment available quantity
    - Calculate and create Fine if late or damaged
    - Update BookIssue status to "Returned"
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 16.10, 16.11, 16.12_
  
  - [ ]* 24.4 Write property test for book return quantity increment
    - **Property 32: Book Return Quantity Increment**
    - **Validates: Requirements 16.4**
  
  - [ ]* 24.5 Write property test for late return fine calculation
    - **Property 33: Late Return Fine Calculation**
    - **Validates: Requirements 16.5, 16.6**

- [ ] 25. Implement library fine management
  - [ ] 25.1 Implement fine management methods in FineCalculationService
    - Add markFinePaid method
    - Add waiveFine method (Principal only)
    - Add getTotalPendingFines method
    - Add getFineHistory method
    - _Requirements: 17.4, 17.5, 17.6, 17.7, 17.10_
  
  - [ ] 25.2 Integrate fine checking with book issue
    - Check pending fines before allowing book issue
    - Block issue if fines exceed 100
    - _Requirements: 15.9, 17.8_

- [ ] 26. Implement book reservation system
  - [ ] 26.1 Create reservation DTOs
    - Create CreateReservationDto in `school backend/src/modules/library/dto/`
    - Add validation for bookId
    - _Requirements: 18.1_
  
  - [ ] 26.2 Implement ReservationService
    - Create ReservationService in `school backend/src/modules/library/services/reservation.service.ts`
    - Implement createReservation method
    - Verify book is unavailable before allowing reservation
    - Enforce maximum 2 reservations per student
    - Assign queue position
    - _Requirements: 18.1, 18.2, 18.3, 18.9_
  
  - [ ] 26.3 Implement reservation notification workflow
    - Notify first student in queue when book returned
    - Hold book for 48 hours after notification
    - Move to next student if not issued within 48 hours
    - _Requirements: 18.4, 18.5, 18.6_
  
  - [ ] 26.4 Implement reservation management methods
    - Add cancelReservation method
    - Add expireReservation method (after 30 days)
    - Remove reservation when book issued to reserving student
    - _Requirements: 18.7, 18.10, 18.11, 18.12_
  
  - [ ]* 26.5 Write property test for book reservation creation
    - **Property 34: Book Reservation Creation**
    - **Validates: Requirements 18.2**
  
  - [ ]* 26.6 Write property test for student reservation limit
    - **Property 35: Student Reservation Limit**
    - **Validates: Requirements 18.3**

- [ ] 27. Implement library API endpoints
  - [ ] 27.1 Create book catalog endpoints
    - Add POST /api/library/books, GET /api/library/books (with search)
    - Add GET /api/library/books/:id, PATCH /api/library/books/:id
    - Add DELETE /api/library/books/:id (archive)
    - Add POST /api/library/books/import (CSV import)
    - Apply RolesGuard with BOOK_CREATE permission
    - _Requirements: 13.1, 13.7, 13.8, 13.10_
  
  - [ ] 27.2 Create book issue/return endpoints
    - Add POST /api/library/issues (issue book)
    - Add GET /api/library/issues (list active issues)
    - Add PATCH /api/library/issues/:id/extend (extend due date)
    - Add POST /api/library/returns (process return)
    - Apply RolesGuard with BOOK_ISSUE and BOOK_RETURN permissions
    - _Requirements: 15.1, 15.12, 16.1_
  
  - [ ] 27.3 Create fine management endpoints
    - Add GET /api/library/fines (list fines with filters)
    - Add GET /api/library/fines/student/:id (student fines)
    - Add PATCH /api/library/fines/:id/pay (mark paid)
    - Add PATCH /api/library/fines/:id/waive (waive fine)
    - Apply RolesGuard with FINE_MANAGE and FINE_WAIVE permissions
    - _Requirements: 17.4, 17.5, 17.10_
  
  - [ ] 27.4 Create reservation endpoints
    - Add POST /api/library/reservations (create reservation)
    - Add GET /api/library/reservations/my (student's reservations)
    - Add DELETE /api/library/reservations/:id (cancel)
    - _Requirements: 18.1, 18.7, 18.8_
  
  - [ ] 27.5 Create student library card endpoints
    - Add GET /api/library/card (my library card)
    - Add GET /api/library/card/history (borrowing history)
    - Add GET /api/library/card/current (current issues)
    - Allow parent access to child's library card
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.11, 19.12_

- [ ] 28. Implement library reports and analytics
  - [ ] 28.1 Create library report methods in LibraryService
    - Implement methods for usage stats, popular books, overdue books
    - Implement student borrowing statistics
    - Implement category-wise analysis
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.11, 20.12_
  
  - [ ] 28.2 Create library report endpoints
    - Add GET /api/library/reports/usage
    - Add GET /api/library/reports/popular
    - Add GET /api/library/reports/overdue
    - Support PDF and CSV export
    - _Requirements: 20.9, 20.10_

- [ ] 29. Checkpoint - Library management system validation
  - Test book catalog management and search
  - Test book issue/return workflow with fine calculation
  - Test reservation system and notifications
  - Verify library reports work correctly
  - Ensure all tests pass, ask the user if questions arise.

### Phase 5: Frontend Applications

- [ ] 30. Create Parent Portal application
  - [ ] 30.1 Set up Parent Portal React application
    - Create new React app in `ParentPortal/` directory
    - Set up Redux store with RTK Query
    - Configure routing with React Router
    - Copy shared UI components from existing portals
    - _Requirements: 35.1, 35.2, 35.6, 35.10_
  
  - [ ] 30.2 Implement authentication and routing
    - Create login page with parent authentication
    - Implement JWT token storage and refresh
    - Create protected routes for authenticated parents
    - Implement role-based routing
    - _Requirements: 35.3, 35.5_
  
  - [ ] 30.3 Create parent dashboard layout
    - Create ParentDashboardLayout component
    - Create ParentHeader with user menu
    - Create ParentSidebar with navigation
    - Implement responsive design for mobile/desktop
    - _Requirements: 35.2, 35.4_
  
  - [ ] 30.4 Implement children list and selector
    - Create ChildCard component to display child info
    - Create ChildSelector component for switching between children
    - Fetch and display linked children from API
    - Implement account switching like WhatsApp
    - _Requirements: 3.1, 3.2, 3.6, 3.7_
  
  - [ ] 30.5 Implement child details pages
    - Create attendance view page
    - Create announcements view page
    - Create schedule view page
    - Implement date range filtering for attendance
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  
  - [ ] 30.6 Implement fee management pages
    - Create FeeCard component to display fee details
    - Create PaymentUpload component with file upload
    - Create PaymentHistory component
    - Create ReceiptDownload component
    - Implement payment submission workflow
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 10.3_
  
  - [ ] 30.7 Implement library pages
    - Create LibraryCard component showing current issues
    - Create BorrowingHistory component
    - Create FinesList component
    - Display due date reminders
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_
  
  - [ ] 30.8 Implement error handling and loading states
    - Add loading spinners for async operations
    - Display user-friendly error messages
    - Implement form validation
    - _Requirements: 35.7, 35.8, 35.9_
  
  - [ ] 30.9 Implement dark mode and accessibility
    - Add dark mode toggle
    - Ensure WCAG compliance for accessibility
    - Test with screen readers
    - _Requirements: 35.11_
  
  - [ ]* 30.10 Write E2E tests for Parent Portal
    - Test login and authentication flow
    - Test child selection and data viewing
    - Test payment submission workflow
    - Test receipt download

- [ ] 31. Enhance Principle Portal with new features
  - [ ] 31.1 Create parent management pages
    - Create ParentsList page with search and filters
    - Create CreateParent page with form
    - Create LinkStudents page for managing relationships
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ] 31.2 Create fee management pages
    - Create FeeStructures page for managing fee configurations
    - Create FeeAssignment page for individual and bulk assignment
    - Create PaymentApprovals page with pending payments list
    - Create FeeReports page with charts and export options
    - _Requirements: 6.1, 7.1, 7.2, 9.1, 9.2, 9.4, 9.6, 11.1, 11.2, 11.3, 11.6_
  
  - [ ] 31.3 Create library management pages
    - Create BookCatalog page with search and filters
    - Create IssueReturn page for processing transactions
    - Create Fines page for managing fines
    - Create LibraryReports page with analytics
    - _Requirements: 13.1, 14.1, 15.1, 16.1, 17.4, 20.1, 20.2_
  
  - [ ] 31.4 Update sidebar navigation
    - Add "Parents" section to sidebar
    - Add "Fee Management" section with sub-items
    - Add "Library" section with sub-items
    - Update permission-based menu visibility
    - _Requirements: 21.1, 21.2, 21.3_

- [ ] 32. Checkpoint - Frontend applications validation
  - Test Parent Portal on multiple devices and browsers
  - Test Principle Portal enhancements
  - Verify all API integrations work correctly
  - Test responsive design and accessibility
  - Ensure all tests pass, ask the user if questions arise.

### Phase 6: Performance Optimization and Testing

- [ ] 33. Implement database optimizations
  - [ ] 33.1 Create database indexes
    - Add indexes on all foreign keys
    - Add indexes on frequently queried columns (email, phone, status, dates)
    - Add composite indexes for common query patterns
    - _Requirements: 28.1_
  
  - [ ] 33.2 Implement connection pooling
    - Configure TypeORM connection pool (min 10, max 50)
    - Set up connection timeout and idle timeout
    - _Requirements: 28.2_
  
  - [ ] 33.3 Optimize queries with eager loading
    - Use relations in TypeORM queries to prevent N+1
    - Implement query result caching for reports
    - _Requirements: 28.3, 28.7_
  
  - [ ] 33.4 Implement batch operations
    - Use batch inserts for bulk fee assignment
    - Use batch updates where applicable
    - _Requirements: 28.11_
  
  - [ ]* 33.5 Write property test for pagination constraint enforcement
    - **Property 38: Pagination Constraint Enforcement**
    - **Validates: Requirements 28.4, 32.1**
  
  - [ ]* 33.6 Write property test for pagination metadata completeness
    - **Property 39: Pagination Metadata Completeness**
    - **Validates: Requirements 32.5**

- [ ] 34. Implement caching optimizations
  - [ ] 34.1 Implement cache warming on startup
    - Create CacheWarmingService
    - Warm fee structures cache
    - Warm book catalog cache
    - _Requirements: 29.9_
  
  - [ ] 34.2 Implement cache invalidation strategies
    - Invalidate cache on data modification
    - Use cache namespacing by school
    - _Requirements: 29.6, 29.8_
  
  - [ ] 34.3 Configure cache TTLs
    - Set 24-hour TTL for session data
    - Set 1-hour TTL for fee structures
    - Set 30-minute TTL for book catalog
    - Set 5-minute TTL for dashboard stats
    - _Requirements: 29.2, 29.3, 29.4, 29.5_

- [ ] 35. Implement image optimization
  - [ ] 35.1 Create image optimization service
    - Create ImageOptimizationService
    - Implement compression and WebP conversion
    - Generate multiple image sizes (thumbnail, medium, original)
    - Strip EXIF metadata
    - _Requirements: 33.1, 33.2, 33.3, 33.6, 33.7, 33.8_
  
  - [ ] 35.2 Integrate with file upload pipeline
    - Process images on upload
    - Upload optimized versions to cloud storage
    - Generate CDN URLs
    - _Requirements: 33.9, 33.10, 33.11_

- [ ] 36. Implement notification system
  - [ ] 36.1 Create notification service
    - Create NotificationService with email and in-app delivery
    - Implement notification templates
    - Implement notification queue with retry logic
    - _Requirements: 34.1, 34.2, 34.3, 34.4, 34.5, 34.6, 34.8, 34.9, 34.11_
  
  - [ ] 36.2 Integrate notifications with workflows
    - Send notification on payment status change
    - Send notification on book due date (2 days before and on due date)
    - Send notification on fine creation
    - Send notification on reservation availability
    - _Requirements: 9.8, 19.9, 19.10, 18.4, 18.12_
  
  - [ ] 36.3 Implement notification preferences
    - Allow users to configure notification channels
    - Store preferences in database
    - _Requirements: 34.7_

- [ ] 37. Implement comprehensive error handling
  - [ ] 37.1 Create global exception filter
    - Implement GlobalExceptionFilter
    - Map exceptions to appropriate HTTP status codes
    - Sanitize error messages for production
    - Add correlation IDs for request tracing
    - _Requirements: 30.1, 30.2, 30.8_
  
  - [ ] 37.2 Implement retry logic and circuit breaker
    - Add retry logic for transient database errors
    - Implement circuit breaker for external services
    - _Requirements: 30.6, 30.10_
  
  - [ ] 37.3 Implement comprehensive logging
    - Log all errors with stack trace and context
    - Categorize by severity (Critical, Error, Warning, Info)
    - Send alerts for critical errors
    - _Requirements: 30.3, 30.4, 30.5, 30.7_

- [ ] 38. Implement data validation and integrity checks
  - [ ] 38.1 Add database constraints
    - Add foreign key constraints with appropriate cascade rules
    - Add check constraints for positive amounts and logical dates
    - Add unique constraints on critical fields
    - _Requirements: 38.1, 38.3, 38.4, 38.5, 38.6, 38.7, 38.9_
  
  - [ ] 38.2 Implement DTO validation
    - Add class-validator decorators to all DTOs
    - Validate email format, phone format, numeric ranges
    - Validate date order and logical constraints
    - _Requirements: 25.1, 25.2, 25.4, 25.5, 25.8, 25.9, 25.10_
  
  - [ ]* 38.3 Write property test for referential integrity validation
    - **Property 40: Referential Integrity Validation**
    - **Validates: Requirements 38.2**
  
  - [ ]* 38.4 Write property test for positive amount validation
    - **Property 41: Positive Amount Validation**
    - **Validates: Requirements 38.4**
  
  - [ ]* 38.5 Write property test for date order validation
    - **Property 42: Date Order Validation**
    - **Validates: Requirements 38.5**
  
  - [ ]* 38.6 Write property test for fee balance invariant
    - **Property 44: Fee Balance Invariant**
    - **Validates: Requirement invariant**

- [ ] 39. Implement input sanitization and security
  - [ ] 39.1 Implement input sanitization
    - Sanitize all text inputs to remove HTML/script tags
    - Use parameterized queries for all database operations
    - Escape special characters
    - _Requirements: 25.3, 25.11, 25.12_
  
  - [ ] 39.2 Implement file upload security
    - Scan uploaded files for malware
    - Generate unique random filenames
    - Store files with private access
    - Generate signed URLs with expiration
    - _Requirements: 27.4, 27.5, 27.6, 27.7, 27.8, 27.9, 27.11_
  
  - [ ]* 39.3 Write property test for input format validation
    - **Property 6: Input Format Validation**
    - **Validates: Requirements 1.9, 1.10, 25.1, 25.2**

- [ ] 40. Implement monitoring and performance tracking
  - [ ] 40.1 Set up performance monitoring
    - Monitor API response times
    - Monitor database query execution times
    - Monitor memory and CPU usage
    - Monitor cache hit ratios
    - _Requirements: 37.1, 37.2, 37.3, 37.4, 37.6_
  
  - [ ] 40.2 Implement alerting
    - Alert on high response times (> 2 seconds)
    - Alert on high error rates (> 1%)
    - Alert on low cache hit ratio (< 80%)
    - Alert on high resource usage (> 80%)
    - _Requirements: 37.1, 37.2, 37.5, 37.6_
  
  - [ ] 40.3 Create performance dashboard
    - Display key metrics in real-time
    - Show trends over time
    - _Requirements: 37.9, 37.10_
  
  - [ ] 40.4 Implement health check endpoint
    - Create /health endpoint
    - Check database connectivity
    - Check Redis connectivity
    - Check external service availability
    - _Requirements: 30.11_

- [ ] 41. Write comprehensive test suite
  - [ ]* 41.1 Write remaining property-based tests
    - Implement all 44 correctness properties from design document
    - Use fast-check library with minimum 100 iterations
    - Tag each test with feature name and property number
    - _Requirements: 39.5_
  
  - [ ]* 41.2 Write unit tests for all services
    - Test parent service methods
    - Test fee service methods
    - Test library service methods
    - Test security service methods
    - Achieve minimum 80% code coverage
    - _Requirements: 39.1_
  
  - [ ]* 41.3 Write integration tests for workflows
    - Test parent-student linking workflow
    - Test fee payment approval workflow
    - Test book issue/return workflow
    - Test reservation notification workflow
    - _Requirements: 39.2_
  
  - [ ]* 41.4 Write E2E tests for critical user journeys
    - Test parent login and dashboard access
    - Test payment submission and approval
    - Test book issue and return
    - _Requirements: 39.3_
  
  - [ ]* 41.5 Write security tests
    - Test authentication and authorization
    - Test rate limiting
    - Test cross-school data isolation
    - Test input validation and sanitization
    - _Requirements: 39.6_
  
  - [ ]* 41.6 Write performance tests
    - Test system under high load
    - Test concurrent operations
    - Test database query performance
    - _Requirements: 39.7_

- [ ] 42. Checkpoint - Performance and testing validation
  - Run all tests and verify 80% coverage achieved
  - Run performance tests and verify response times
  - Test monitoring and alerting systems
  - Ensure all tests pass, ask the user if questions arise.

### Phase 7: Documentation and Deployment

- [ ] 43. Create API documentation
  - [ ] 43.1 Generate OpenAPI/Swagger documentation
    - Add Swagger decorators to all controllers
    - Document request/response schemas
    - Document authentication requirements
    - Document error codes
    - _Requirements: 40.1, 40.2, 40.3, 40.4_
  
  - [ ] 43.2 Add API examples and guides
    - Provide code examples for common operations
    - Document rate limiting information
    - Document pagination parameters
    - _Requirements: 40.6, 40.7, 40.8_
  
  - [ ] 43.3 Create API changelog
    - Document all new endpoints
    - Document breaking changes (if any)
    - Document versioning strategy
    - _Requirements: 40.5, 40.9_

- [ ] 44. Create database documentation
  - [ ] 44.1 Document database schema
    - Create entity relationship diagrams
    - Document all tables and columns
    - Document indexes and constraints
    - _Requirements: 40.10_
  
  - [ ] 44.2 Document migration procedures
    - Create migration scripts for all new tables
    - Create rollback scripts
    - Test migrations on copy of production data
    - _Requirements: 36.9, 36.10, 39.8_

- [ ] 45. Create deployment configuration
  - [ ] 45.1 Set up environment variables
    - Document all required environment variables
    - Create .env.example files
    - Document encryption key rotation procedure
    - _Requirements: 22.7, 22.8, 40.11_
  
  - [ ] 45.2 Configure CI/CD pipeline
    - Set up automated testing in pipeline
    - Set up automated deployment
    - Set up database migration automation
    - _Requirements: 39.4, 39.11_
  
  - [ ] 45.3 Create deployment checklist
    - Database migration steps
    - Environment variable configuration
    - Cache warming procedures
    - Health check verification
    - Rollback procedures

- [ ] 46. Perform backward compatibility verification
  - [ ] 46.1 Test existing functionality
    - Verify all existing API endpoints work
    - Verify existing frontend applications work
    - Verify existing authentication works
    - _Requirements: 36.1, 36.6, 36.7, 36.11_
  
  - [ ] 46.2 Verify data integrity
    - Run data integrity checks on all tables
    - Verify foreign key constraints
    - Verify no data loss from migrations
    - _Requirements: 36.9, 38.10_

- [ ] 47. Final system integration and validation
  - [ ] 47.1 Perform end-to-end system testing
    - Test complete parent account workflow
    - Test complete fee management workflow
    - Test complete library management workflow
    - Test cross-module integrations
  
  - [ ] 47.2 Perform security audit
    - Verify encryption is working correctly
    - Verify RBAC is enforced everywhere
    - Verify rate limiting is active
    - Verify audit logging is comprehensive
    - Verify cross-school isolation is enforced
  
  - [ ] 47.3 Perform performance validation
    - Verify response times meet requirements
    - Verify caching is working correctly
    - Verify database queries are optimized
    - Verify system handles expected load
  
  - [ ] 47.4 Create user acceptance testing plan
    - Prepare test scenarios for Principal users
    - Prepare test scenarios for Parent users
    - Prepare test scenarios for Library Staff users
    - Document expected outcomes

- [ ] 48. Final checkpoint - Production readiness
  - All tests passing with 80%+ coverage
  - All documentation complete
  - Security audit passed
  - Performance requirements met
  - Backward compatibility verified
  - Deployment procedures documented
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at major milestones
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases
- The implementation follows a modular approach: Security → Parents → Fees → Library → Frontend → Optimization
- All new features integrate seamlessly with existing modules
- Database migrations maintain backward compatibility
- Complete test coverage ensures system reliability

## Implementation Guidelines

1. **Module Structure**: Follow existing NestJS patterns in the codebase
2. **Database**: Use TypeORM entities with proper decorators and constraints
3. **Authentication**: Extend existing JWT-based auth system
4. **Multi-Tenancy**: Use existing TenantConnectionService for school isolation
5. **Testing**: Use Jest for unit tests, fast-check for property tests, Playwright for E2E
6. **Frontend**: Use React + Redux + RTK Query consistent with existing portals
7. **API Design**: Follow RESTful conventions with consistent response format
8. **Error Handling**: Use global exception filter with proper HTTP status codes
9. **Security**: Apply guards at controller level, validate at DTO level
10. **Performance**: Implement caching, indexing, and query optimization from the start

## Success Criteria

- All 48 tasks completed successfully
- All checkpoints passed
- Minimum 80% test coverage achieved
- All 44 correctness properties validated
- API documentation complete
- Parent Portal fully functional
- Principle Portal enhancements complete
- All security measures implemented
- Performance requirements met
- Backward compatibility maintained
