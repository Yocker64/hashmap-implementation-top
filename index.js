 

// Ground rule, you cannot make use of the auto-resize of JS


 if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}


class HashMap {
  constructor() {
    this.buckets = []
    this.hash = function (key) {
   let hashCode = 0;
      
   const primeNumber = 31;
   for (let i = 0; i < key.length; i++) {
     hashCode = primeNumber * hashCode + key.charCodeAt(i);
   }

   return hashCode;
 } 
  }
}





// Linked list implementation
class LinkedList {

  constructor(head) {
    this.head= new Node(head);
    this.tail = this.head;
    this.size = 1;
    
    
    
  }
append(value) {
    this.tail.nextNode = new Node(value);
    this.tail = this.tail.nextNode;
    this.size ++;
  }

  prepend(value){
    let newHead = new Node(value);
    newHead.nextNode = this.tail;
    this.head = newHead;
    this.size ++;
  }

  at(index){
    let returnNode = this.head
    for (let i = 0; i < index; i++) {
      returnNode = returnNode.nextNode
    }
    return returnNode
  }

  pop(){
    this.tail = this.at(this.size-1)
    this.tail.nextNode = undefined
    this.size --;
  }

  toString(){
    let currentNode=  this.head;
    let string = "";
    for (let i = 0; i < this.size-1; i++) {
      string += (`(${currentNode.data}) -> `)
      currentNode = currentNode.nextNode
    }
    string +=(`(${currentNode.data})`)
    return string

  }
  contains(value){
    let currentNode = this.head
    for (let i = 0; i < this.size; i++) {
      if (currentNode.data == value) {
        return true
      }
      currentNode = currentNode.nextNode
      
    }
    return false
  }

  find(value){
    let currentNode = this.head;
    let index= 0;
    for (let i = 0; i < this.size; i++) {
      if (currentNode.data == value) {
        return index
      }
      currentNode = currentNode.nextNode;
      index ++;
      
    }
    return undefined
  }

  insertValue(value, index){
    let nodeToMove = this.at(index-1);
    let newNode = new Node(value);
    newNode.nextNode = nodeToMove.nextNode
    nodeToMove.nextNode = newNode;
    this.size ++;
  }

  removeAt(index){
    let modifyNode = this.at(index-1);
    modifyNode.nextNode = modifyNode.nextNode.nextNode;
    this.size --;
  }
  }

  function printHead(linkedList) {
    console.log(linkedList.head);
    
  }

  class Node {
  constructor(data) {
    this.data = data;
    this.nextNode = undefined;
  }
}