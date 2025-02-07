# 🏨 Hotel Management App

## 📝 Project Overview

This **Hotel Management Application** is designed exclusively for hotel employees to manage cabins, bookings, and guest data efficiently. The app ensures secure access, enabling staff to handle reservations, monitor guest details, and maintain hotel operations smoothly.

## 📌 Note

The core functionality of this project was developed as part of a course, following the instructor's guidance. This includes authentication, cabin management, booking management, dashboard, settings, and user management.
**Additional features have been implemented by me as challenges.**

## 🛠️ Tech Stack

- **Frontend:** React, React Query
- **Backend & Database:** Supabase
- **UI Styling:** Tailwind CSS

## 🎯 Features

### 🔐 Authentication

- Only hotel employees can sign up within the application.
- Secure login required to access the system.
- Employees can update their avatar, name, and password.

### 🏠 Cabin Management

- **View all cabins with details:**
  - Photo
  - Name
  - Capacity
  - Price
  - Discount (if applicable)
- **Manage cabins:**
  - Add new cabins (including photo upload)
  - Edit cabin details
  - Delete cabins

### 📆 Booking Management

- **View all bookings with details:**
  - Arrival & departure dates
  - Booking status ("unconfirmed", "checked in", "checked out")
  - Paid amount
  - Guest and cabin details
- **Manage bookings:**
  - Filter by status
  - Delete bookings
  - Check guests in or out
  - Confirm payments upon check-in
  - Add breakfast for guests (if not pre-selected)
- **Additional Features Implemented:**
  - Create new bookings
  - Edit existing bookings
  - Bookings follow minimum and maximum night stay rules

### 🧑‍💼 Guest Management

- **Guest details include:**
  - Full name
  - Email
  - National ID
  - Nationality (with a country flag for easy identification)
- **Manage guests:**
  - View registered guests
  - Create and remove guest profiles
  - Edit guest details
  - Search for guests
  - View guest booking history
  - Monitor guest check-in status

### 📊 Dashboard

- Overview of hotel metrics for the last **7, 30, or 90 days**:
  - List of guests checking in and out (with quick actions)
  - Statistics on recent bookings, sales, check-ins, and occupancy rate
  - Daily hotel sales chart (total and extra sales like breakfast)
  - Stay duration statistics chart

### ⚙️ Application Settings

- Configurable options for:
  - Breakfast price
  - Minimum & maximum nights per booking
  - Maximum guests per booking

### 🌙 Dark Mode

- Employees can switch between light and dark themes for better usability.

## 🚀 Installation & Setup

### 📥 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Supabase account](https://supabase.com/)

### 🌐 Setting up Supabase Database API

![Sample Image](./screenShots/database.png)

### ⚡ Steps to Run Locally

1. **Clone the repository**:

   ```sh
   git clone https://github.com/rajwindersxxx/the-wild-oasis.git
   cd the-wild-oasis
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up Supabase key variables**:
    - ⚙️ Go to `src/services/supabase.js` and replace the Supabase keys:

    ```javascript
    export const supabaseUrl = YOUR_SUPABASE_URL;
    const supabaseKey = YOUR_SUPABASE_KEY;
    ```

4. **Create a user on Supabase**

5. **Run the app**:

   ```sh
   npm run dev
   ```

---

**👤 Author:** Rajwinder Pal Singh  
**🔗 GitHub:** [Rajwinder Singh](https://github.com/rajwindersxxx)

