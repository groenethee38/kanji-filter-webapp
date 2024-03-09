from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

df = pd.read_excel('data.xlsx')

jlpt_n5_data = []
jlpt_n4_data = []
jlpt_n3_data = []
jlpt_n2_data = []

for index, row in df.iterrows():
    if "N5" in row["JLPT Level"]:
        jlpt_n5_data.append(row)
    if "N4" in row["JLPT Level"]:
        jlpt_n4_data.append(row)
    if "N3" in row["JLPT Level"]:
        jlpt_n3_data.append(row)
    if "N2" in row["JLPT Level"]:
        jlpt_n2_data.append(row)


@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("home.html")

@app.route("/index", methods=["GET", "POST"])
def index():
    return render_template("index.html", jlpt_n5_data=jlpt_n5_data, jlpt_n4_data=jlpt_n4_data, jlpt_n3_data=jlpt_n3_data, jlpt_n2_data=jlpt_n2_data)

if __name__ == "__main__":
    app.run(debug=True)