import os
import google.generativeai as genai
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

# Set up the Gemini API key from environment variables
os.environ["API_KEY"] = "AIzaSyBWbAOjxpQx0UEDxORL0XRScDNyT4d3-sY"
genai.configure(api_key=os.environ["API_KEY"])

# Initialize FastAPI app
app = FastAPI()

# Function to interact with the Gemini API
def ask_gemini(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

# Function to handle the query
def handle_query(query):
    return ask_gemini(query)

# Define the request body structure for receiving queries
class QueryRequest(BaseModel):
    query: str

# Endpoint to process the query
@app.post("/process-query/")
async def process_query(request: QueryRequest):
    query = request.query

    # Step 1: Categorize the query based on BHISM Hospital Management Website context
    link_query = '''The user query should be categorized into one of the following categories regarding the BHISM Hospital Management Website. Return only the number corresponding to the correct category as the response. If the query is irrelevant or unrelated, return category 19. Here are the categories:
    Authorization/Sign-in/Sign-up/Password related queries
    Appointment/Meeting/Checkup related queries
    Receipt/Slip/Acknowledgement related queries
    Lab Queue/Lab Availability/Lab Status/Lab Reports related queries
    Family members medical info related queries
    Vaccination related queries
    Blood Bank/Blood Donation related queries
    Billing System/Payment/Invoice related queries
    Medicine Names/Pharmacy Inventory/Medicine Request related queries
    Dietary Management
    User profile/User Details/Account Details/User history related queries
    Emergency Services/Ambulance Services related queries
    Helpline Booking/Helpline Enquiry/Helpline Numbers related queries
    Upload Reports/Delete Uploaded Files related queries
    Location-Based Hospital Search related queries
    Staff/Doctors Availability related queries
    Bed Availability related queries
    General Medical Queries (not website-specific)
    Unrelated queries (Not relevant or need to be rephrased)''' + query

    # Step 2: Generate the response for the query
    s = '''Please answer this query by considering that the user is asking in the context of a Hospital Management Website named 'BHISM'. 
        The response must include the following: 
        1. Greet the user if they greet first. 
        2. Provide a clear, concise explanation of the process. 
        3. Break the process into steps, but do not use explicit section headings. 
        4. Include instructions on how to navigate the 'BHISM' website without providing direct links. Use placeholders like 'Here’s the link:' instead. 
        5. Specify what actions the user should take. 
        6. Mention expected results, but avoid section titles like 'Expected Outcomes'. 
        7. Avoid international helpline numbers (like 911) and only use placeholders for helpline numbers. 
        8. If the query is unrelated to the website or medical topics, prompt the user to ask a relevant query or rephrase it.''' + query

    # Step 3: Get the category and response using Gemini API
    category = handle_query(link_query)
    response = handle_query(s)

    # Step 4: Return the response and category as a JSON object
    return {"response": response, "category": category}


# Run the FastAPI app using Uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
