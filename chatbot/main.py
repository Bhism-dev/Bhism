import os
from dotenv import load_dotenv  # Import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Set up the Gemini API key from environment variables
genai.configure(api_key=os.environ["API_KEY"])

# Initialize FastAPI app
app = FastAPI()

# Add CORSMiddleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Function to interact with the Gemini API
def ask_gemini(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    if response.parts:
        return response.text
    else:
        return "No response"

# Function to handle the query

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
    link_query = '''The user query should be categorized into one of the following categories regarding the BHISM Hospital Management Website. Return only the number corresponding to the correct category as the response. If a query fits in multiple categories, return the number corresponding to anyone of them which you find suitable. If the query is irrelevant or unrelated or if you don't understand the query, return category 19. Here are the categories:
    About BHISM/BHISM Helpline Numbers or Contact Numbers
    Authorization/Sign-in/Sign-up/Password related queries
    Appointment/Meeting/Checkup/OPD/opd related queries
    Receipt/Slip/Acknowledgement related queries
    Lab Queue/Lab Availability/Lab Status/Lab Reports related queries
    Family members medical info related queries
    Vaccination/Injection related queries
    Blood Bank/Blood Donation related queries
    Billing System/Payment/Invoice related queries
    Medicine Names/Pharmacy Inventory/Medicine Request related queries
    Dietary Management
    User profile/User Details/Account Details/User history related queries
    Emergency Services/Ambulance Services related queries
    Helpline Numbers/Emergency Numbers/Helpline Booking/Helpline Enquiry related queries
    Upload Reports/Delete Uploaded Files related queries
    Location-Based Hospital Search related queries
    Staff/Doctors Availability related queries
    Bed Availability related queries
    General Medical Queries (not website-specific)
    Unrelated queries (Not relevant or need to be rephrased)''' + query

    # Step 2: Generate the response for the query
    s = '''Please answer this query by considering that the user is asking in the context of a Hospital Management Website named 'BHISM'. "BHISM is a comprehensive Hospital Management
          Website designed to streamline healthcare services. It provides a wide range of features such as OPD Booking, Lab Management, Blood Bank services, Vaccination tracking,
          Bed Availability updates, and Emergency Services. For more information on how to navigate and utilize BHISM's facilities, please follow these steps."
        "BHISM Helpline number/Phone number: +91-7815071114"
        The Chatbot name is "SAHAAYAK"
        "Don't prompt the user to greet. Greet the user only if the user query says Hello,Hi,etc and introduce yourself as SAHAAYAK chatbot"
        "The response must include the following: "
        "1. Provide a clear, concise explanation of the process. "
        "2. Break the process into steps and keep it short and simple, but do not use explicit section headings."
        "3. Include instructions on how to navigate the 'BHISM' website without providing direct links. Use placeholders like *Here's the link:* instead. "
        "4. Specify what actions the user should take. "
        "5. Mention expected results, but avoid section titles like 'Expected Outcomes'. "
        "6. Avoid international helpline numbers (like 911) and only use Emergency helpline numbers like 102, 108, 112."
        "7. If the query is unrelated to the website or medical topics, prompt the user to ask a relevant query or rephrase it.
        "8. If someone asks you the query in hindi then the reply should be in hindi only.
        "9. If the user says Thank You or Bye Bye, answer accordingly and say thank you for using "SAHAAYAK"(Name of the BHISM Chatbot). Now, Here is the query: ''' + query

    # Step 3: Get the category and response using Gemini API
    category = handle_query(link_query)
    response = handle_query(s)

    # Step 4: Return the response and category as a JSON object
    return {"response": response, "category": category}


# Run the FastAPI app using Uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)