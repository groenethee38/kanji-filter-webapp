import requests
from bs4 import BeautifulSoup
import pandas as pd


def scrape(url):
    df = pd.read_excel('data.xlsx', header=0)

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    kanji_list = []

    for kanji_row in soup.find_all('tr')[1:]:
        kanji_data = [td.get_text(strip=True) for td in kanji_row.find_all('td')]
        if any(kanji_data):
            kanji_list.append({
                "#": kanji_data[0],
                "Kanji": kanji_data[1],
                "Onyomi": kanji_data[2],
                "Kunyomi": kanji_data[3],
                "Kanji Meaning": kanji_data[4],
                "JLPT Level": [
                    "JLPT N5" if "n5" in url else
                    "JLPT N4" if "n4" in url else
                    "JLPT N3" if "n3" in url else
                    "JLPT N2" if "n2" in url else
                    ''
                ]
            })


    kanji_list_df = pd.DataFrame(kanji_list)

    df = pd.concat([df, kanji_list_df], ignore_index=False)
    df.to_excel('data.xlsx', index=False,)
    print("data appended succesfully")    
    print(df)

urls = [
    'https://jlptsensei.com/jlpt-n5-kanji-list/',
    'https://jlptsensei.com/jlpt-n4-kanji-list/',
    'https://jlptsensei.com/jlpt-n4-kanji-list/page/2/',
    'https://jlptsensei.com/jlpt-n3-kanji-list/',
    'https://jlptsensei.com/jlpt-n3-kanji-list/page/2/',
    'https://jlptsensei.com/jlpt-n3-kanji-list/page/3/',
    'https://jlptsensei.com/jlpt-n3-kanji-list/page/4/',
    'https://jlptsensei.com/jlpt-n2-kanji-list/',
    'https://jlptsensei.com/jlpt-n2-kanji-list/page/2/',
    'https://jlptsensei.com/jlpt-n2-kanji-list/page/3/',
    'https://jlptsensei.com/jlpt-n2-kanji-list/page/4/',
]

if __name__ == "__main__":
    for url in urls:
        print("Scraping: " + url)
        scrape(url)