from app.models import BotDetails
import json

class ChatBot:
    def __init__(self, botname):
        print("Initiating for ", botname)
        bot_details = BotDetails.objects.filter(bot_name=botname)
        if bot_details:
            bot_details = bot_details.values()[0]

        required = {"question" : None, "question_id" : None, "answers" : None, "answers_id" : None, "question_type" : None, "media" : None}
        # print(bot_details, bot_details['question'], type(bot_details['question']))
        for each in required.keys():
            required[each] = json.loads(bot_details[each].replace("'", '"'))

        self.required = required

    def first_question(self):
        return self.required['question'][0]

    def talk(self, ask):
        i_index, ith_index = None, None
        print(self.required['answers'])
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
                return new_question

            else:
                return "No Records Found"
        else:
            return "No Records Found"
