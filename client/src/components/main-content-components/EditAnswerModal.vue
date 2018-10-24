<template>
<div class="modal fade" id="modal-edit-answer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Answer</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Content:</label>
              <textarea class="form-control" id="message-text" v-model="inputContent"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
            
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editAnswer">submit</button>
          
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
            inputContent: '',
        };
    },
    watch: {
        answer(val) {
            
            this.inputContent = val.content;
        }
    },
    computed: {
        ...mapState([
            'answer'
        ])
    },
    mounted() {
        
    },
    methods: {
        ...mapActions([
            'getAnswers', 'getAnswer'
        ]),

        editAnswer() {
            this.$server({
                method: 'PUT',
                url: `/answer/${this.answer.question}`,
                data: {
                    content: this.inputContent,
                    id: this.answer._id
                },
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.inputContent = '';
                this.getAnswers(this.$route.params.id)
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style>

</style>
