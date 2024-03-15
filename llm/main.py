from langchain.llms import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, List
import json
import re

app = FastAPI()

# CORS middleware setup
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai_api_key = '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'
# Initialize the OpenAI LLM with your API key
llm = OpenAI(api_key=openai_api_key)

class CompareJetsRequest(BaseModel):
  comparisonCategory: str
  jets: List[Dict[str, Any]]

@app.post("/api/compare_jets")
async def compare_jets(request: CompareJetsRequest):
  data = json.loads(request.json())
  rankings = process_jets(data["comparisonCategory"], data["jets"])

  def rank_jets(jets_data, comparison_category):
    sorted_jets = sorted(jets_data, key=lambda x: x[comparison_category], reverse=True)
    ranked_table = [
        {"Rank": i + 1, "Name": jet["name"], "Value": jet[comparison_category]} for i, jet in enumerate(sorted_jets)
    ]
    print(ranked_table)
    return ranked_table
  
  ranked_table = rank_jets(rankings, data["comparisonCategory"])

  return ranked_table

def process_jets(comparison_category, jets_data):
  def generate_llm_response(comparison_category, jets_data):
      for jet in jets_data:
        prompt_parts = [f"Please provide the following detail for the {jet["name"]}, and consider additional jet info such as {jet["wingspan"]}, {jet["numberOfEngines"]}, {jet["manufacturingYear"]}."]

        prompt_parts.append(f"- {comparison_category}")
        prompt_parts.append(f"If the category is top_speed, unit is mph. If the category is fuel_efficiency, unit is mpg.")
        prompt_parts.append(f"Example: The response should be in 1 of these 3 formats: 'The top_speed for the {jet["name"]} is 500 mph', or 'The fuel_efficiency for the {jet["name"]} is 50.5 mpg', or 'The maximum_seats for the {jet["name"]} is 10 seats.'")

        comprehensive_prompt = "\n".join(prompt_parts)
        response = llm(comprehensive_prompt)
        print(response)
        print((parse_llm_response(comparison_category, response))[0])
        jet[comparison_category] = (parse_llm_response(comparison_category, response))[0]
      return jets_data
  
  generate_llm_response(comparison_category, jets_data)

  return jets_data


def parse_llm_response(attribute, input_str):
    # Regular expressions for each type of input
    patterns = {
        'top_speed': r'(\d+(\.\d+)?)\s*mph\.',
        'fuel_efficiency': r'(\d+(\.\d+)?)\s*mpg\.',
        'maximum_seats': r'(\d+)\s*seats?\.'
    }
    
    # Match the input string against the appropriate pattern
    pattern = patterns.get(attribute)
    if not pattern:
        return None, "Invalid attribute"
    
    match = re.search(pattern, input_str, re.IGNORECASE)
    if match:
        # Convert to float if it's a top speed or fuel efficiency, int if maximum seats
        if attribute in ['top_speed']:
            return int(match.group(1)), "Success"
        elif attribute in ['fuel_efficiency']:
            return float(match.group(1)), "Success"
        elif attribute == 'maximum_seats':
            return int(match.group(1)), "Success"
    else:
        return None, "No match found"
