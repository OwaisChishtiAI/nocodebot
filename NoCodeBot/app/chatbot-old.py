from app.models import BotDetails
import json
import pandas as pd

class ChatBot:
    def __init__(self, botname):
        print("Initiating for ", botname)
        bot_details = BotDetails.objects.filter(bot_name=botname)
        if bot_details:
            bot_details = bot_details.values()[0]

        required = {"question" : None, "question_id" : None, "answers" : None, "answers_id" : None, "question_type" : None, "qmedia" : None, "amedia": None}
        # print(bot_details, bot_details['question'], type(bot_details['question']))
        for each in required.keys():
            required[each] = json.loads(bot_details[each].replace("'", '"'))

        self.required = required

    def get_bot_details(self):
        return self.required

    def first_question(self):
        # return self.required['question'][0]
        new_question = self.required['question'][0]
        # if self.required['question_type'][0] == "dq":
        options = self.required['answers'][0]
        li = []
        li.append(new_question)
        if self.required['question_type'][0] == "dq":
            file = self.required['answers'][0][0]
            df = pd.read_excel("db_files/"+file)
            df = list(df[df.columns[0]].values)
            li.append(df)
            db_question = file
        else:
            li.append(options)
            db_question = ""
        new_question = li
        return {"new_question" : new_question, "media" : self.required['media'][0], "new_question_type" : self.required['question_type'][0],\
            "db_question": db_question}

    def talk(self, ask):
        i_index, ith_index = None, None
        print("[INFO] Answer Asked: ", ask)
        for i in range(len(self.required['answers'])):
            try:
                answer_id = self.required['answers'][i].index(ask)
                print("[INFO] Answer Found")
                i_index = i; ith_index = answer_id
            except:
                pass

        if ith_index != None:
            answer_id_value = self.required['answers_id'][i_index][ith_index]
            print("[INFO] Answer Found ID: ", answer_id_value)
            try:
                question_id = self.required['question_id'].index(answer_id_value)
                print("[INFO] Question Found")
            except:
                question_id = None
                print("[INFO] Question Not Found")
            
            if question_id != None:
                new_question = self.required['question'][question_id]
                print("[INFO] Question Asked ", new_question)
                question_type = self.required['question_type'][question_id]
                # if question_type == "dq":
                options = self.required['answers'][question_id]
                li = []
                li.append(new_question)
                if self.required['question_type'][question_id] == "dq":
                    file = self.required['answers'][question_id][0]
                    df = pd.read_excel("db_files/"+file)
                    df = list(df[df.columns[0]].values)
                    li.append(df)
                    db_question = file
                else:
                    li.append(options)
                    db_question = ""
                new_question = li
                media = self.required['media'][question_id]
                return {"new_question" : new_question, "media" : media, "new_question_type" : question_type, "db_question" : db_question}

            else:
                return {"new_question" : "Records Not Found", "media" : "", "new_question_type" : ""}
        else:
            return {"new_question" : "Records Not Found", "media" : "", "new_question_type" : ""}
