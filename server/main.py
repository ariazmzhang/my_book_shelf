import requests
from bs4 import BeautifulSoup
import json



def extract_douban_info(url):
    # Send a GET request to the provided URL
    response = requests.get(url)

    # Create a BeautifulSoup object to parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')
    print(soup.prettify())
    # Extract the problem name
    # problem = soup.find('span', class_='mr-2 text-xl font-medium leading-8 text-label-1 dark:text-dark-label-1').text.strip()
    # problem = soup.find('span', class_='mr-2').text.strip()

    # problem_name = problem.split('.')[1]
    # # Extract the problem number
    # problem_number = problem.split('.')[0]
    # # Extract the problem description
    # # Find the div containing the problem description
    # description_div = soup.find('div', class_='_1l1MA')

    # # Find all the paragraphs within the description div
    # paragraphs = description_div.find_all('p')

    # # Filter out paragraphs after the paragraph containing "<p>&nbsp;</p>"
    # filtered_paragraphs = []
    # for paragraph in paragraphs:
    #     if paragraph.string and paragraph.string.split(' ')[0] == 'Example':
    #         break
    #     filtered_paragraphs.append(paragraph.text.strip())

    # # Join the filtered paragraphs into a single string
    # problem_description = "\n".join(filtered_paragraphs)

    # # problem_description = soup.find('div', class_='_1l1MA').find('p').text.strip()
    # problem_difficulty = soup.find('div', class_='mt-3').find('div').text.strip()

    # # problem_description = soup.find('div', class_='css-13iwqin').text.strip()

    # # Return the extracted information as a dictionary
    # return {
    #     'name': problem_name,
    #     'number': problem_number,
    #     'description': problem_description,
    #     'difficulty': problem_difficulty.lower(),
    # }

url = 'https://book.douban.com/subject/1647538/'
# url = 'https://leetcode.com/problems/two-sum/'
# url = 'http://www.google.com'
extract_douban_info(url)