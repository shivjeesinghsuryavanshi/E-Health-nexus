# E-Health Nexus

A comprehensive healthcare platform connecting patients and doctors for appointment booking and management.

## Screenshots

Here are some screenshots showcasing the E-Health Nexus application:

![User Dashboard](assets/screenshots/screenshot1.png)
*User Dashboard - Main interface for patients to book appointments and view doctors*

![Doctor Management](assets/screenshots/screenshot2.png)
*Doctor Management - Interface for doctors to manage their appointments and patient interactions*

![Appointment Booking](assets/screenshots/screenshot3.png)
*Appointment Booking - Step-by-step process for booking medical appointments*

## Running the Application

1. Start the application using the `start.bat` file:
   - Double-click `start.bat` or run it from the command prompt
   - This will start both the backend server (on port 5000) and frontend server (on port 3000)

2. Access the application:
   - Open your browser and go to `http://localhost:3000`
   - The backend API is accessible at `http://localhost:5000`

## Troubleshooting "Failed to Fetch" Errors

If you encounter "Failed to Fetch" errors in the application, try the following solutions:

1. **Make sure the backend server is running:**
   - Check if the backend terminal window is open and shows "server started"
   - If not, run `cd backend && npm run dev` in a terminal

2. **Verify MongoDB Connection:**
   - Ensure MongoDB is running
   - Check the backend terminal for "database connected" message
   - If you see database connection errors, verify your MongoDB URI in the `.env` file

3. **Test API Connectivity:**
   - When logged in as a user, use the "Test API Connection" button in the sidebar to diagnose connectivity issues
   - Check browser console (F12) for detailed error messages

4. **Browser Console Errors:**
   - Open your browser's developer tools (F12)
   - Check the console tab for specific error messages
   - Common errors include CORS issues, network errors, or authentication problems

5. **CORS Issues:**
   - If seeing CORS errors, ensure the backend CORS settings are properly configured
   - The backend should have `app.use(cors({ origin: '*' }))` in `index.js`

6. **Authentication Issues:**
   - Ensure you're properly logged in and have a valid token
   - Try logging out and logging back in
   - Clear browser cache and cookies if issues persist

7. **Server Unavailable:**
   - If you can't access http://localhost:5000 directly in your browser
   - Restart the backend server or check if it's running on a different port

## Component Reference

- **/frontend/src/app/user-dashboard/page.jsx** - User dashboard to book appointments and view doctors
- **/frontend/src/app/doctor/appointments/page.jsx** - Doctor's appointment management view
- **/backend/routers/slotRouter.js** - All slot/appointment-related backend routes
- **/backend/routers/DoctorRouter.js** - Doctor-related routes
- **/backend/routers/Patient.js** - Patient-related routes
