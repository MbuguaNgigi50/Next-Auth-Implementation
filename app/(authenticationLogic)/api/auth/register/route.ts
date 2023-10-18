/*This is the registration API endpoint that will handle all the registration functionality when a new user is signing up.
The registration process involves signing up with:
- Email
- Password
- Confirm Password
- Any other detail that would be appropriate

****This route ONLY accepts POST requests****

*/

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        //Validation
    } catch (error) {
        console.log(error)
    }
}
