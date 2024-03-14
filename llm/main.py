from langchain.llms import OpenAI
# from langchain.prompts import PromptTemplate
# from langchain.chains import LLMChain
# from langchain.chains import SinglePromptChain

# Your OpenAI API Key
openai_api_key = 'openai-api-key'
# Initialize the OpenAI LLM with your API key
llm = OpenAI(api_key=openai_api_key)


# Function to generate prompts and fetch data from the LLM
def fetch_comparison_values(llm, jets_data, comparison_category):
    for jet in jets_data:
        prompt = f"Provide the {comparison_category} for the {jet['name']}."
        response = llm(prompt)
        jet[comparison_category] = float(response)
    return jets_data

# Define the comparison and ranking logic
def compare_jets(jets_data, comparison_category):
    sorted_jets = sorted(jets_data, key=lambda x: x[comparison_category], reverse=True)
    ranked_table = [
        {"Rank": i + 1, "Name": jet["name"], "Value": jet[comparison_category]} for i, jet in enumerate(sorted_jets)
    ]
    return ranked_table

# Integrating fetching and comparison in a single function
def jets_comparison_chain(llm, jets_data, comparison_category):
    # Fetch comparison values for each jet
    jets_with_values = fetch_comparison_values(llm, jets_data, comparison_category)
    
    # Compare jets based on the fetched values
    result = compare_jets(jets_with_values, comparison_category)
    print(result)
    return result

jets_data = [
    {"name": "GulfStream G650", "wingspan": 99.7, "year": 2012, "engines": 2},
    {"name": "Bombardier Global 7500", "wingspan": 104, "year": 2018, "engines": 2}
]

comparison_category = "top_speed"  # This category is an example; it can be dynamically changed

jets_comparison_chain(llm, jets_data, comparison_category)


