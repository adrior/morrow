$(function(){
    // chrome.storage.local.get('input', function(data) {
    //     $('input.add').val(data.input);
    // });
    // $('input.add').change(function(e){
    //     chrome.storage.local.set({'input': e.target.value}, function() {
    //     });
    // })
    jBlock._onDomReady();
})

jBlock
.match('tasks', function(){
    this
        .append(
            this.copy('e_header'),
            this.copy('e_task'),
            {e_add: ''}
        )
})

.match('tasks__task', function(){
    this
        .replaceWith({
            b_task: this.copy(),
            estimate: this.param('estimate')||1,
            complited: this.param('complited')||0
        })
})

.match('tasks__add', function(){
    this.append(
        {e_input: ''},
        {b_button: 'Add'}
    )
})

.match('tasks__input', function(){
    this
        .tag('input')
        .attr('placeholder', 'Add task')
})

.match('task', function(){
    this
        .js()
        .defParam({
            estimate: 1,
            complited: 0
        })
    var estimate = this.param('estimate');
    var complited = this.param('complited');
    var max = _.max([estimate, complited]);
    console.log(max, estimate, complited);
    var pomos = [];
    for (var i=0; i<max; i++) {
        if (i < complited && i < estimate) {
            pomos.push({e_pomo: '', m_complited: true})
        } else if (i >= estimate) {
            pomos.push({e_pomo: '', m_overestimate: true})
        } else {
            pomos.push({e_pomo: ''})
        }
    }
    this
        .append(
            {
                e_title: [
                    {e_check: ''},
                    {e_text: this.text(), tag: 'span'},
                    {e_count: pomos}
                ]
            }
        )
})

.match('task__pomo', function(){
    this.tag('span')
})

.match('task__check', function(){
    this
        .tag('input')
        .attr('type', 'checkbox')
})

.match('button', function(){
    this
        .tag('button')
})
