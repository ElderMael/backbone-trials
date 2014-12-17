(function (root) {

    var TodoItem = Backbone.Model.extend({
        defaults: function () {
            return {
                done: false,
                text: 'This is a pending todo'
            };
        }
    });

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile($('#todo-template').html()),

        el: '#app',        

        initialize: function () {
            this.model = new TodoItem();
        },

        events: {
            'dblclick li': 'toggleEditMode',
            'keypress .todo-text-input': 'modifyText'
        },
        
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        toggleEditMode: function (){
            this.$el.find('.edit').toggleClass('hidden');
        },

        modifyText: function(event) {
          this.$el.find('.todo-display-text').html(this.$el.find('.todo-text-input').val());
          if(event.keyCode === 13){
            this.model.set({
                text: this.$el.find('.todo-text-input').val()
            });
            this.toggleEditMode();
          }
        }


    });

    var AboutView = Backbone.View.extend({

        el: '#app',

        render: function(){
            this.$el.html("Copylefts: ElderMael");
            return this;
        }
    });

    var IndexView = Backbone.View.extend({

        template: Handlebars.compile('<a href="#todo">{{salute}}</a>'),

        el: '#app',

        render: function () {
            this.$el.html(this.template({
                salute: 'Hello, World!'
            }));
            return this;
        }
    });


    var AppRouter = Backbone.Router.extend({

        initialize: function () {
            this.indexView = new IndexView();
            this.todoView = new TodoView();
            this.aboutView = new AboutView();
        },

        start: function () {
            Backbone.history.start();
            this.indexView.render();
        },

        routes: {
            '': 'index',
            'todo': 'todo',
            'about': 'about'
        },

        index: function () {
            this.indexView.render();
        },

        todo: function () {
            this.todoView.render();
        },

        about: function(){
            this.aboutView.render();
        }

    });

    var appRouter = new AppRouter();

    root.App = {
        router: appRouter
    }


})(this);

$(document).ready(function () {
    App.router.start();
});