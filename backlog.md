<aside>
📌

**Short description**

- Work/Study plan management app.
- Users enter subjects (or other tasks), weekly availability, and objectives.
- The system generates an optimal weekly plan.
- Includes analytics dashboard and collaboration (groups to share plans, react, comment).
</aside>

---

## User types

| Type | Role description |
| --- | --- |
| GU (General user) | Student or anyone who has work to do; casual user of the system. |
| Admin | Manages general users (GUs). The system can contain more than one admin. |
| Super Admin | Manages admins. The system can contain more than one super admin. |
| System | The application (automated behaviors). |

---

## Backlog

- Authentication
    
    
    | Description | User |
    | --- | --- |
    | Create an account with all required credentials. | GU |
    | Initiate the first super admin account. | System |
    | Create a Super Admin/Admin account. | Super Admin |
    | Log in and log out (username/email + password). | Super Admin, Admin, GU |
    | Activate 2FA. | Super Admin, Admin, GU |
    | Ban / unban a GU. | Super Admin, Admin |
    | Inactivate an Admin account. | Super Admin |
    | Reset password (with 2FA via email or authenticator if enabled). | Super Admin, Admin, GU |
    | Change password (using email) if user forgot it. | Super Admin, Admin |
    | Promote an Admin to Super Admin. | Super Admin |
- Profile
    
    
    | Description | User |
    | --- | --- |
    | View and edit profile information. | GU, Super Admin, Admin |
    | Terminate own account. | GU |
- Subject
    
    
    | Description | User |
    | --- | --- |
    | Create, edit, delete a subject. | GU |
    | Define name, description, and priority (high, medium, low). | GU |
- Objective / Goal
    
    
    | Description | User |
    | --- | --- |
    | Set, edit, delete a goal. | GU |
    | Define the number of hours per week to study per subject. | GU |
    | Maintain a to-do list inside a goal and update progress by changing task statuses. | GU |
- Availability
    
    
    | Description | User |
    | --- | --- |
    | Set available time per day. | GU |
- Generator
    
    
    | Description | User |
    | --- | --- |
    | Auto-generate weekly sessions based on goals, availability, and subject priority. | System |
    | Respect max session duration and avoid overlaps. | System |
    | Show the user all generated available sessions. | System |
    | Manually adjust a generated session (drag, resize, delete). | GU |
- Sessions
    
    
    | Description | User |
    | --- | --- |
    | Create, edit, delete a manual session and mark it as completed/missed. | GU |
- Group
    
    
    | Description | User |
    | --- | --- |
    | Create a group (creator becomes admin) and set it to open or locked. | GU |
    | See list of groups, join an open group, or request to join a locked group (invite via email). | GU |
    | Invite members; accept/decline invitation requests. | GU |
    | Leave group; transfer group administration to another user (if that user is an admin). | GU |
    | View group members. | GU |
    | Share accepted sessions in the group; react and comment on shared sessions. | GU |
    | Use a global chat between group members. | GU |
    | Group admin can change the role of others in the group. | GU |
- Notifications
    
    
    | Description | User |
    | --- | --- |
    | Receive reminders before a session starts (in-app + email). | GU |
    | Receive notifications for group invitations and join-request responses (accepted/rejected). | GU |
    | Receive notifications about shared sessions (reactions and comments). | GU |
- Statistics
    
    
    | Description | User |
    | --- | --- |
    | View statistics about own sessions. | GU |
    | View group statistics (if group admin). | GU |
    | View statistics about GUs and groups. | Admin, Super Admin |
    | View statistics about Admins. | Super Admin |