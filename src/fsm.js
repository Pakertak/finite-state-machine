class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.configur=config;
        this.activeState=config.initial;
        this.states=[];
        this.laststates=[];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return String(this.activeState);
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.configur.states[state]) throw new Error();
        else {
            this.states.push(this.activeState);
            this.activeState=state;
        }
        while(this.laststates.length)
            this.laststates.pop();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(!this.configur.states[this.activeState].transitions[event]) throw new Error();
        else {
            this.states.push(this.activeState);
            this.activeState=this.configur.states[this.activeState].transitions[event];
        }
        while(this.laststates.length)
            this.laststates.pop();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState=this.configur.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let array=[];
        if(event==undefined){
            for(let state in this.configur.states)
                array.push(state);
            return array;
        } 
        for(let state in this.configur.states)
            if(this.configur.states[state].transitions[event])
                array.push(state);
        return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.states.length)
        {
            this.laststates.push(this.activeState);
            this.activeState=this.states.pop();
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.laststates.length){
            this.activeState=this.laststates.pop();
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        while(this.laststates.length)
            this.laststates.pop();
        while(this.states.length)
            this.states.pop();
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
