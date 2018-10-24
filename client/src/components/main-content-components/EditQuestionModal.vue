<template>
<div class="modal fade" id="modal-edit-question" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title:</label>
              <input type="text" class="form-control" id="recipient-name" v-model="inputTitle">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Content:</label>
              <textarea class="form-control" id="message-text" v-model="inputContent"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editQuestion">submit</button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
    name: 'CreateQuestionModal',
    props:['fetchQuestion'],
    data() {
        return {
            inputTitle: '',
            inputContent: '',
        };
    },
    watch: {
        question(val) {
            
            this.inputTitle = val.title;
            this.inputContent = val.content;
        }
    },
    computed: {
        ...mapState([
            'question'
        ])
    },
    mounted() {
        
    },
    methods: {
        ...mapActions([
            'getQuestions', 'getQuestion'
        ]),

        editQuestion() {
            this.$server({
                method: 'PUT',
                url: `/question/${this.question._id}`,
                data: {
                    title: this.inputTitle,
                    content: this.inputContent,
                },
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.inputTitle = '';
                this.inputContent = '';
                this.fetchQuestion();
                this.getQuestions()
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style>

</style>
