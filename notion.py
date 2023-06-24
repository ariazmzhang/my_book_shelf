import requests

api_key = "secret_Cx5oui77A5URSMrMN8e6PzRxMKhlKnQUdm8PjBfeWWn"
database_id = '78af2031510941dea9ab80b0a9a93a69'

headers = {
    "Authorization": "Bearer " + api_key,
    'Content-Type': 'application/json',
    'Notion-Version': "2022-06-28",
}

def create_page(data: dict):
    create_url = "https://api.notion.com/v1/pages"

    payload = {"parent": {"database_id": database_id}, "properties": data}

    res = requests.post(create_url, headers=headers, json=payload)
    print(res.status_code)
    return res


def get_pages(num_pages=None):
    """
    If num_pages is None, get all pages, otherwise just the defined number.
    """
    url = f"https://api.notion.com/v1/databases/{database_id}/query"

    get_all = num_pages is None
    page_size = 100 if get_all else num_pages

    payload = {"page_size": page_size}
    response = requests.post(url, json=payload, headers=headers)

    data = response.json()

    # Comment this out to dump all data to a file
    # import json
    # with open('db.json', 'w', encoding='utf8') as f:
    #    json.dump(data, f, ensure_ascii=False, indent=4)

    results = data["results"]
    while data["has_more"] and get_all:
        payload = {"page_size": page_size, "start_cursor": data["next_cursor"]}
        url = f"https://api.notion.com/v1/databases/{database_id}/query"
        response = requests.post(url, json=payload, headers=headers)
        data = response.json()
        results.extend(data["results"])

    return results

# print(get_pages(num_pages=None))

def update_page(page_id: str, data: dict):
    url = f"https://api.notion.com/v1/pages/{page_id}"

    payload = {"properties": data}

    res = requests.patch(url, json=payload, headers=headers)
    return res



if __name__ == '__main__':
    from datetime import datetime, timezone

    Title = "Test Title"
    Author = "Test Description"
    published_date = datetime.now().astimezone(timezone.utc).isoformat()
    data = {
        "URL": {"title": [{"text": {"content": Author}}]},
        "Title": {"rich_text": [{"text": {"content": Title}}]},
        "Published": {"date": {"start": published_date, "end": None}}
    }

    create_page(data)
    