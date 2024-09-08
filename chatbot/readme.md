# BHISM Hospital Management Chatbot - SAHAAYAK

This repository contains a FastAPI-based backend service that interacts with Google Gemini's Generative AI (via the `google.generativeai` package) to process user queries related to a Hospital Management Website, `BHISM`. The system is designed to categorize user queries and generate appropriate responses based on the context of hospital services. It includes features such as query categorization, response generation, and instructions for users to navigate the hospital website.

## Features
- **Query Categorization:** Queries are classified into 19 different categories, specific to the BHISM Hospital Management Website.
- **Generative Response:** Using Google Gemini, the system generates context-aware responses to user queries.
- **FastAPI Framework:** FastAPI is used to create a lightweight and fast API for handling requests.
- **Step-by-step Responses:** The chatbot provides clear, step-by-step instructions to users without using explicit section titles.

## API Endpoints

### POST /process-query/
- **Description:** Processes user queries by categorizing them and generating appropriate responses.
- **Request Body:**
    - `query`: A string containing the user query.
  
- **Response:**
    - `category`: The category number assigned to the query (1-19).
    - `response`: A generative response providing steps and instructions based on the query.

### Query Categories
1. Authorization/Sign-in/Sign-up/Password related queries
2. Appointment/Meeting/Checkup related queries
3. Receipt/Slip/Acknowledgement related queries
4. Lab Queue/Lab Availability/Lab Status/Lab Reports related queries
5. Family members medical info related queries
6. Vaccination related queries
7. Blood Bank/Blood Donation related queries
8. Billing System/Payment/Invoice related queries
9. Medicine Names/Pharmacy Inventory/Medicine Request related queries
10. Dietary Management
11. User profile/User Details/Account Details/User history related queries
12. Emergency Services/Ambulance Services related queries
13. Helpline Booking/Helpline Enquiry/Helpline Numbers related queries
14. Upload Reports/Delete Uploaded Files related queries
15. Location-Based Hospital Search related queries
16. Staff/Doctors Availability related queries
17. Bed Availability related queries
18. General Medical Queries (not website-specific)
19. Unrelated queries (Not relevant or need to be rephrased)

## Requirements

### Dependencies:
- **Python 3.7+**
- **FastAPI:** For the web framework.
- **Uvicorn:** ASGI server to run FastAPI.
- **Google Generative AI (gemini) API:** For generating responses.
- **Python-dotenv:** For loading environment variables from a `.env` file.

### Install Dependencies:
```bash
pip install fastapi pydantic uvicorn google-generativeai python-dotenv
```

### Environment Variables:
Set up your Gemini API key:
```bash
export API_KEY="your-google-gemini-api-key"
```

### Running the Application
Clone the repository:
```bash
git clone https://github.com/yourusername/bhism-chatbot
cd bhism-chatbot
```

Run the FastAPI application using Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 5000
Access the API at http://localhost:5000.
```

### Example Request
To send a query to the chatbot, use the following example:
```bash
curl -X 'POST' \
  'http://localhost:5000/process-query/' \
  -H 'Content-Type: application/json' \
  -d '{"query": "How can I register for an OPD appointment?"}'
```

### License
This project is licensed under the MIT License.
