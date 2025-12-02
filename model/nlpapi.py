from flask import Flask  # pyright: ignore[reportMissingImports]
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort # pyright: ignore[reportMissingImports]
from flask_cors import CORS

# Import needed dependencies
from transformers import pipeline # pyright: ignore[reportMissingImports]

app = Flask(__name__)
api = Api(app)
CORS(app)

textParser = reqparse.RequestParser()
textParser.add_argument('prompt', type=str, required=True, help='prompt is required')

class Text(Resource):
    def __init__(self) -> None:
        super().__init__()
        self.repo_name = "willphan1712/fake_news_detection"
        self.task = "text-classification"

    def post(self):
        try:
            args = textParser.parse_args()

            text = args['prompt']
            predictor = pipeline(self.task, model=self.repo_name)

            result = predictor(text, truncation=True, max_length=512)

            if (result[0]['label'] == 'LABEL_1'):
                return {
                    'result': 'This is a good heading'
                }

            return {
                'result': 'This is a misleading heading'
            }
        except Exception as e:
            return {
                'error': 'There is an error'
            }, 500

api.add_resource(Text, '/api/analyze')

@app.route("/")
def home():
    return "<h1>Will phan - KSU</h1>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)

