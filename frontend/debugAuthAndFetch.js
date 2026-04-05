// Add this function to your manage-appointment page
const debugAuthAndFetch = async () => {
    try {
        // Check what's in localStorage
        const userString = localStorage.getItem('user');
        console.log('Raw localStorage user:', userString);

        // Try to parse it
        let parsedUser;
        try {
            parsedUser = JSON.parse(userString || '{}');
            console.log('Parsed user:', parsedUser);
        } catch (parseError) {
            console.error('Failed to parse user from localStorage:', parseError);
            return;
        }

        // Check token
        if (!parsedUser.token) {
            console.error('No token found in user data');
            return;
        }

        // Make a test request to a simple endpoint
        const testResponse = await fetch('http://localhost:5000/ping', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const testText = await testResponse.text();
        console.log('Test ping response:', testText);

        // Now try the actual endpoint
        const response = await fetch('http://localhost:5000/slot/doctor-booked-slots', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${parsedUser.token}`,
                'Content-Type': 'application/json'
            }
        });

        // Get response as text first to see what's coming back
        const responseText = await response.text();
        console.log('Raw API response:', responseText);

        // Try parsing it
        try {
            const parsedData = JSON.parse(responseText);
            console.log('Parsed data:', parsedData);
        } catch (jsonError) {
            console.error('Failed to parse response as JSON:', jsonError);
        }
    } catch (error) {
        console.error('Debug fetch failed:', error);
    }
};

export default debugAuthAndFetch;
