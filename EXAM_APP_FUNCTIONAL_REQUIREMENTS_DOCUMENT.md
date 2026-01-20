# Functional Requirements Document (FRD)
## Exam Shield Forge - Online Examination Platform

**Document Version:** 1.0  
**Date:** January 2026  
**Project:** Secure Online Examination System

---

## 1. EXECUTIVE SUMMARY

This document outlines the functional requirements for the Exam Shield Forge platform, a comprehensive online examination system with role-based access control, proctoring capabilities, and adaptive testing features. The system supports two primary user roles: **Student (Candidate)** and **Admin**, each with distinct functionalities and access levels.

---

## 2. SYSTEM OVERVIEW

### 2.1 Purpose
The platform provides a secure, proctored online examination environment with features for exam creation, candidate management, real-time monitoring, and comprehensive reporting.

### 2.2 User Roles
- **Admin**: System administrators and exam creators
- **Student (Candidate)**: Exam takers and test participants

### 2.3 Technology Stack
- Frontend: React with TypeScript
- UI Framework: Shadcn/ui with Tailwind CSS
- Routing: React Router
- State Management: React Context API
- Authentication: Email/Password based authentication

---

## 3. AUTHENTICATION & AUTHORIZATION

### 3.1 Login System
**FR-AUTH-001: Dual Role Login**
- System provides separate login interfaces for Admin and Student roles
- Users select their role (Admin/Student) via tabbed interface before authentication
- Email and password-based authentication mechanism
- Password visibility toggle functionality

**FR-AUTH-002: Session Management**
- User authentication state persisted in localStorage
- Automatic session restoration on page reload
- Logout functionality available to all authenticated users

**FR-AUTH-003: Role-Based Access Control**
- Protected routes enforce role-based access restrictions
- Admin users cannot access Student routes and vice versa
- Unauthorized access attempts redirect to appropriate dashboard
- Unauthenticated users redirected to login page

**FR-AUTH-004: Demo Credentials**
- System provides pre-configured demo accounts for testing
- Multiple admin accounts available (2 accounts)
- Multiple student accounts available (5 accounts)

---

## 4. STUDENT (CANDIDATE) FUNCTIONALITIES

### 4.1 Student Dashboard

**FR-STU-001: Dashboard Overview**
- Display personalized welcome message with student name
- Show quick statistics:
  - Active exams count (currently available to take)
  - Upcoming exams count (scheduled future exams)
  - Completed exams count
  - Average score percentage across all completed exams

**FR-STU-002: Active Exam Alerts**
- Highlight currently available exams with priority display
- Show exam details: title, description, duration, total marks, passing marks
- Display exam end time countdown
- Provide "Start Exam" action button for immediate access

**FR-STU-003: Upcoming Exams Display**
- List scheduled future examinations
- Display exam date, time, duration, and marks information
- Show countdown in days until exam start
- No action buttons until exam becomes active

**FR-STU-004: Recent Results Summary**
- Display latest exam results with scores and percentages
- Show pass/fail status with visual indicators
- Display score progress bars
- Provide "View Details" action for each result

**FR-STU-005: System Requirements Check**
- Real-time system compatibility verification
- Check camera access and functionality
- Check microphone access and functionality
- Check browser compatibility
- Check internet connection stability
- Display overall system readiness status (Ready/Issues/Failed)
- Provide manual refresh capability
- Show detailed status for each component with messages
- Display warnings and action items for failed requirements

### 4.2 My Exams

**FR-STU-006: Exam Listing**
- Display all assigned exams categorized by status:
  - Active Exams (currently available)
  - Upcoming Exams (scheduled)
  - Completed Exams (past exams)
- Show exam metadata: title, description, subject, duration, question count, marks

**FR-STU-007: Exam Details Display**
- Display proctoring status badge if exam is proctored
- Show exam scheduling information (start date, end date)
- Display negative marking indicator if applicable
- Show passing marks requirement

**FR-STU-008: System Check for Proctored Exams**
- Mandatory system check before starting proctored exams
- Display system check dialog with component-wise verification
- Block exam start if critical system requirements fail
- Allow exam start with warnings for non-critical issues

**FR-STU-009: Exam Actions**
- "Start Exam" button for active exams
- "View Details" button for upcoming exams
- "View Result" button for completed exams
- System check button accessible from exam list

### 4.3 Exam Taking Interface

**FR-STU-010: Exam Header**
- Display exam title and current question number
- Show remaining time with countdown timer
- Display proctoring status indicators (camera, microphone, shield)
- Show violation warning count for proctored exams
- Provide "Submit Exam" button

**FR-STU-011: Question Display**
- Display question text with clear formatting
- Show question difficulty level badge
- Display marks allocated to question
- Show flagged status indicator if question is marked for review

**FR-STU-012: Answer Input**
- Multiple Choice Questions (MCQ): Radio button selection
- True/False Questions: Radio button selection
- Subjective Questions: Text area for written responses
- Preserve answers when navigating between questions

**FR-STU-013: Question Navigation**
- "Previous" and "Next" buttons for sequential navigation
- Question palette for direct navigation to any question
- Visual indicators for question status:
  - Current question (highlighted)
  - Answered questions (green)
  - Flagged questions (yellow/warning)
  - Unanswered questions (gray)

**FR-STU-014: Question Flagging**
- "Flag for Review" functionality for marking questions
- Toggle flag status on/off
- Visual indication in question palette
- Summary count of flagged questions

**FR-STU-015: Progress Tracking**
- Progress bar showing exam completion percentage
- Summary statistics:
  - Total questions answered
  - Questions flagged for review
  - Remaining unanswered questions

**FR-STU-016: Exam Submission**
- Manual exam submission via "Submit Exam" button
- Automatic submission when timer expires
- Confirmation before final submission
- Redirect to success page after submission

### 4.4 Proctoring Features (Student Side)

**FR-STU-017: Proctoring Monitoring**
- Real-time camera feed monitoring
- Microphone audio monitoring
- Screen recording during exam
- Face detection verification
- Tab switch detection

**FR-STU-018: Proctoring Status Display**
- Show monitoring active status
- Display face detection status
- Show screen recording status
- Display audio monitoring status
- Show violation count and warnings remaining

**FR-STU-019: Violation Handling**
- Display violation modal when infractions detected
- Show violation type and description
- Display remaining warnings before exam termination
- Allow acknowledgment to continue exam
- Automatic exam termination after maximum violations

**FR-STU-020: Violation Types Detected**
- Tab switching (leaving exam window)
- Face not detected (candidate not visible)
- Multiple faces detected (unauthorized persons)
- Suspicious activity (unusual movements)

### 4.5 Linguaskill/Adaptive Testing

**FR-STU-021: Pre-Test Setup**
- Display pre-test instructions and system check
- Audio/video equipment verification
- Practice questions before actual test
- Module selection interface

**FR-STU-022: Module-Based Testing**
- Support for multiple test modules:
  - Reading Module (maximum 59 minutes)
  - Listening Module (maximum 59 minutes, audio playback twice)
  - Writing Module (45 minutes)
  - Speaking Module (approximately 16 minutes)
- Independent module completion tracking
- Module-specific interfaces and controls

**FR-STU-023: Adaptive Question Delivery**
- Questions adapt based on candidate performance
- Dynamic difficulty adjustment
- Varied question types per module

**FR-STU-024: Audio/Video Controls**
- Audio playback controls for listening module
- Recording controls for speaking module
- Playback review capability
- Volume controls

### 4.6 Results & Performance

**FR-STU-025: Results Dashboard**
- Display all exam results with filtering options:
  - All Results
  - Passed Exams
  - Failed Exams
- Show overall performance statistics:
  - Total exams taken
  - Total passed exams
  - Average score percentage
  - Total time spent

**FR-STU-026: Individual Result Display**
- Show exam title and subject
- Display score, total marks, and percentage
- Show pass/fail status with visual indicators
- Display grade (A+, A, B+, B, C, F)
- Show time taken for exam
- Display submission date

**FR-STU-027: Result Actions**
- "View Details" button for detailed result analysis
- "Download Report" button for result export
- Export result as text file with complete information

**FR-STU-028: Performance Visualization**
- Performance trend chart placeholder
- Score progress over time
- Subject-wise performance breakdown

### 4.7 Student Profile Management

**FR-STU-029: Profile Information Display**
- Display profile photo/avatar
- Show student name and ID
- Display verification status badge
- Show profile completion percentage
- Display quick statistics (exams taken, average score, assigned exams, member since)

**FR-STU-030: Personal Information Management**
- Edit full name
- View student ID (read-only)
- Edit email address
- Edit phone number
- Edit date of birth
- Edit address
- Edit emergency contact details (name and phone)

**FR-STU-031: Profile Photo Management**
- Display current profile photo
- "Update Photo" functionality

**FR-STU-032: Security Settings**
- Change password functionality
- Current password verification
- New password with confirmation
- Password visibility toggle
- Two-Factor Authentication (2FA) enable option
- View active sessions

**FR-STU-033: Notification Preferences**
- Toggle email exam reminders
- Toggle SMS exam reminders
- Toggle results notifications
- Toggle system updates notifications

**FR-STU-034: Privacy & Data Management**
- Export personal data functionality
- Account deletion option
- Privacy notice display

### 4.8 ID Verification

**FR-STU-035: Identity Verification Process**
- Pre-exam identity verification requirement
- Photo capture of candidate
- Photo capture of ID document
- Verification success/failure feedback
- Automatic redirect to exam after successful verification

---

## 5. ADMIN FUNCTIONALITIES

### 5.1 Admin Dashboard

**FR-ADM-001: Dashboard Overview**
- Display personalized welcome message
- Show key metrics:
  - Total exams count
  - Active exams count
  - Total candidates count
  - Average score across all exams
- Display trend indicators (increase/decrease from previous period)

**FR-ADM-002: Exam Creation Workflow**
- Display 6-step workflow visualization:
  1. Create Question Bank
  2. Design Exam
  3. Configure Proctoring
  4. Assign Candidates
  5. Schedule & Publish
  6. Monitor & Report
- Show current workflow step status (completed/current/pending)

**FR-ADM-003: Proctoring Alerts**
- Display recent security and monitoring events
- Show violation type and candidate details
- Display severity level (High/Medium/Low)
- Show exam context for each alert

**FR-ADM-004: Exam Calendar**
- Display upcoming scheduled exams
- Show exam date, time, and status
- Visual calendar representation
- Quick access to exam details

**FR-ADM-005: Quick Actions**
- "Create Exam" shortcut
- "Add Candidates" shortcut
- "Review Violations" shortcut
- "View Reports" shortcut

### 5.2 Question Bank Management

**FR-ADM-006: Question Repository**
- Display all questions in centralized repository
- Show question metadata: subject, topic, difficulty, type, marks
- Support for multiple question types:
  - Multiple Choice Questions (MCQ)
  - True/False Questions
  - Subjective Questions

**FR-ADM-007: Question Search & Filter**
- Search questions by text, subject, or topic
- Filter by subject
- Filter by difficulty level (Easy/Medium/Hard)
- Display filtered results count

**FR-ADM-008: Add New Question**
- Create questions via dialog interface
- Input fields:
  - Question text
  - Subject
  - Topic
  - Question type (MCQ/True-False/Subjective)
  - Difficulty level
  - Marks allocation
  - Negative marks (optional)
  - Answer options (for MCQ/True-False)
  - Correct answer selection
  - Explanation text

**FR-ADM-009: Question Management Actions**
- Edit existing questions
- Delete questions from bank
- View question details
- Bulk operations support

**FR-ADM-010: Import/Export Questions**
- Import questions from Excel file
- Export question bank to file
- Bulk upload capability

### 5.3 Exam Management

**FR-ADM-011: Exam Listing**
- Display all exams with status indicators
- Show exam metadata: title, subject, duration, candidates, status
- Filter exams by status (Published/Draft/Completed)
- Search exams by title or subject

**FR-ADM-012: Exam Status Management**
- Visual status indicators:
  - Published (active/live)
  - Draft (not published)
  - Completed (finished)
- Status-specific icons and colors

**FR-ADM-013: Create New Exam (Wizard)**
- Multi-step exam creation wizard:
  - **Step 1: General Settings**
    - Exam title
    - Subject
    - Description
    - Duration (minutes)
    - Total marks
    - Passing marks
  - **Step 2: Question Pool**
    - Select questions from question bank
    - Question randomization option
  - **Step 3: Proctoring Configuration**
    - Enable/disable proctoring
    - Configure proctoring settings
  - **Step 4: Scheduling**
    - Set start date and time
    - Set end date and time
  - **Step 5: Candidate Assignment**
    - Select candidates for exam
    - Batch assignment option

**FR-ADM-014: Exam Configuration Options**
- Negative marking enable/disable
- Question randomization
- Allow backward navigation
- Auto-submit on timeout
- Show question palette
- Full-screen mode enforcement

**FR-ADM-015: Exam Actions**
- View exam details
- Edit exam configuration
- Delete exam
- Publish/unpublish exam
- Clone exam

### 5.4 Candidate Management

**FR-ADM-016: Candidate Repository**
- Display all registered candidates
- Show candidate information: name, email, phone, batch
- Display candidate avatar/photo
- Show registration date

**FR-ADM-017: Candidate Search**
- Search by candidate name
- Search by email address
- Real-time search filtering

**FR-ADM-018: Add New Candidate**
- Single candidate registration via dialog
- Input fields:
  - Full name
  - Email address
  - Phone number
  - Batch assignment

**FR-ADM-019: Bulk Candidate Operations**
- Bulk upload via Excel file
- Export candidate list
- Mass candidate assignment

**FR-ADM-020: Candidate Statistics**
- Total candidates count
- Active students count
- New registrations count
- Batch distribution

**FR-ADM-021: Candidate Actions**
- Edit candidate details
- Delete candidate
- View candidate profile
- View candidate exam history

### 5.5 Batch Management

**FR-ADM-022: Batch Organization**
- Create student batches for group management
- Display batch information: name, course, academic year, candidate count
- Show assigned exams per batch

**FR-ADM-023: Create New Batch**
- Input batch details:
  - Batch name
  - Description
  - Course
  - Academic year
- Assign candidates to batch during creation

**FR-ADM-024: Batch Assignment**
- Assign candidates to existing batches
- View unassigned candidates
- Bulk candidate assignment to batch

**FR-ADM-025: Batch Statistics**
- Total candidates in batch
- Assigned exams count
- Active exams count
- Batch performance metrics

**FR-ADM-026: Batch Actions**
- Edit batch details
- Delete batch
- View batch details
- Assign exams to entire batch

### 5.6 Proctoring Management

**FR-ADM-027: Violation Monitoring**
- Display all proctoring violations
- Show violation details:
  - Candidate name and ID
  - Exam title
  - Violation type
  - Severity level (High/Medium/Low)
  - Timestamp
  - Duration
  - Status (Flagged/Reviewed/Dismissed)

**FR-ADM-028: Violation Filtering**
- Filter by severity level
- Filter by violation type
- Search by candidate name or exam
- Filter by status

**FR-ADM-029: Active Monitoring Dashboard**
- Display currently running proctored exams
- Show real-time candidate count
- Display violation count per exam
- Show exam start time and duration
- Real-time status updates

**FR-ADM-030: Violation Types Tracked**
- Tab switching detection
- Face not detected
- Multiple faces detected
- Suspicious activity
- Audio anomalies

**FR-ADM-031: Proctoring Configuration**
- Enable/disable face detection
- Enable/disable tab switch detection
- Enable/disable screen recording
- Enable/disable audio monitoring
- Set violation threshold
- Configure auto-flagging

**FR-ADM-032: Violation Actions**
- Review violation details
- Mark as reviewed
- Dismiss violation
- Flag for investigation
- View recorded evidence

### 5.7 Reports & Analytics

**FR-ADM-033: Overview Analytics**
- Display key metrics:
  - Total exams conducted
  - Total candidates registered
  - Total results generated
  - Average score across platform
  - Pass rate percentage
  - Completion rate

**FR-ADM-034: Performance Reports**
- Subject-wise performance analysis
- Average scores by subject
- Pass rates by subject
- Student participation by subject

**FR-ADM-035: Exam Trends**
- Monthly exam statistics
- Participant trends over time
- Average score trends
- Exam frequency analysis

**FR-ADM-036: Proctoring Statistics**
- Total violations count
- Violations by severity
- Violation type distribution
- Violation trends over time

**FR-ADM-037: Top Performers**
- Display high-performing candidates
- Show average scores
- Display exams completed count
- Rank-based listing

**FR-ADM-038: Report Export**
- Export reports as PDF
- Export reports as CSV
- Export reports as Excel
- Custom date range selection

**FR-ADM-039: Detailed Reports**
- Exam-specific detailed reports
- Candidate-wise performance reports
- Question-wise analysis
- Time-based analytics

**FR-ADM-040: Report Filtering**
- Filter by date range (Last 7/30/90 days, Custom)
- Filter by exam
- Filter by subject
- Filter by candidate

### 5.8 Calendar Management

**FR-ADM-041: Exam Scheduling Calendar**
- Visual calendar interface for exam scheduling
- Display scheduled exams on calendar
- Show exam details on date selection
- Month/week/day view options

**FR-ADM-042: Schedule Management**
- View all scheduled exams
- Reschedule exams
- Cancel scheduled exams
- Conflict detection for overlapping exams

### 5.9 System Settings

**FR-ADM-043: General Settings**
- Configure system name
- Set system email
- Configure timezone
- Set default language

**FR-ADM-044: Security Settings**
- Configure session timeout duration
- Set maximum login attempts
- Set password minimum length
- Enable/disable two-factor authentication requirement

**FR-ADM-045: Exam Default Settings**
- Set default exam duration
- Configure auto-submit on timeout
- Set default backward navigation policy
- Configure question number display
- Set default question randomization

**FR-ADM-046: Proctoring Default Settings**
- Enable/disable face detection by default
- Enable/disable screen recording by default
- Enable/disable tab switch detection by default
- Enable/disable audio monitoring by default
- Set default violation threshold
- Configure auto-flag violations

**FR-ADM-047: Notification Settings**
- Enable/disable email notifications
- Enable/disable SMS notifications
- Configure exam reminder notifications
- Configure result notifications

**FR-ADM-048: System Maintenance**
- Enable/disable maintenance mode
- Set maintenance message
- Schedule system maintenance

**FR-ADM-049: Backup Settings**
- Enable/disable automatic backups
- Set backup frequency (Daily/Weekly/Monthly)
- Configure retention period (days)

**FR-ADM-050: Settings Actions**
- Save all settings changes
- Reset to default values
- Export settings configuration

---

## 6. COMMON FUNCTIONALITIES

### 6.1 Navigation

**FR-COM-001: Role-Based Navigation Menu**
- Admin navigation includes:
  - Dashboard
  - Question Bank
  - Exam Management
  - Candidate Management
  - Batch Management
  - Calendar
  - Proctoring
  - Reports
  - Settings
- Student navigation includes:
  - Dashboard
  - My Exams
  - Results
  - Profile

**FR-COM-002: User Profile Access**
- Display current user name and avatar in header
- Logout functionality accessible from all pages
- User role indicator

### 6.2 UI/UX Features

**FR-COM-003: Responsive Design**
- Mobile-responsive interface
- Tablet-optimized layouts
- Desktop-optimized layouts

**FR-COM-004: Visual Feedback**
- Toast notifications for actions
- Loading states for async operations
- Success/error message displays
- Progress indicators

**FR-COM-005: Theme & Styling**
- Consistent color scheme
- Gradient primary buttons
- Card-based layouts
- Icon-based visual indicators

---

## 7. TECHNICAL REQUIREMENTS

### 7.1 Browser Compatibility
- Support for modern browsers (Chrome, Firefox, Edge, Safari)
- Browser compatibility checking for proctored exams
- WebRTC support for camera/microphone access

### 7.2 Performance Requirements
- Real-time timer updates (1-second intervals)
- Efficient state management for large question sets
- Optimized rendering for question palettes

### 7.3 Security Requirements
- Role-based access control enforcement
- Protected routes with authentication checks
- Secure session management
- Password-protected authentication

### 7.4 Data Persistence
- LocalStorage for session persistence
- Answer auto-save during exam
- State preservation on page refresh

---

## 8. FEATURE SUMMARY BY ROLE

### Student Features (35 Core Features)
1. Dashboard with statistics and alerts
2. System requirements checking
3. Exam listing and categorization
4. Exam taking interface with multiple question types
5. Question navigation and flagging
6. Proctoring compliance monitoring
7. Violation acknowledgment
8. Linguaskill/adaptive testing modules
9. Results viewing and filtering
10. Performance analytics
11. Profile management
12. Security settings
13. Notification preferences
14. ID verification

### Admin Features (50 Core Features)
1. Comprehensive dashboard with metrics
2. Question bank management with CRUD operations
3. Question import/export
4. Multi-step exam creation wizard
5. Exam configuration and scheduling
6. Candidate management with bulk operations
7. Batch organization and management
8. Real-time proctoring monitoring
9. Violation tracking and review
10. Comprehensive reporting and analytics
11. Calendar-based exam scheduling
12. System-wide settings configuration
13. Security policy management
14. Backup and maintenance controls

---

## 9. CONCLUSION

This Functional Requirements Document captures all features implemented in the Exam Shield Forge platform as derived from the codebase. The system provides a complete examination management solution with distinct, role-appropriate functionalities for both Students and Admins, ensuring secure, monitored, and efficient online examination delivery.

**Total Functional Requirements: 85+**
- Authentication & Authorization: 4 requirements
- Student Functionalities: 35 requirements
- Admin Functionalities: 50 requirements
- Common Functionalities: 5 requirements

---

**Document Status:** Final  
**Approval Required:** Stakeholder Review  
**Next Steps:** Technical Specification Document, Implementation Planning
