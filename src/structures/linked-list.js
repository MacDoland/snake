class SinglyLinkedList {
    constructor(){
        this.#clear();
    }

    push(value){
        const node = new SinglyLinkedListNode(value);

        if(!this.head){
            this.head = node;
            this.tail = this.head;
        }
        else {
            this.tail.setNext(node);
            this.tail = node;
        }

        this.length += 1;

        return this;
    }
    
    //pop, shift, unshift - not required for snake
   

    #clear(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}

class SinglyLinkedListNode {
    #next;
    #value;

    constructor(value){
        this.#next = null;
        this.#value = value;
    }

    value() {
        return this.#value;
    }

    next() {
        return  this.#next;
    }

    setNext(node) {
        this.#next = node;
    }

    setValue(value){
        this.#value = value;
    }
}

export default SinglyLinkedList;