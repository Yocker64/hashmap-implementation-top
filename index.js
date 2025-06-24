// Ground rule, you cannot make use of the auto-resize of JS

class Node {
  constructor(data) {
    this.data = data;
    this.nextNode = undefined;
  }
}

class LinkedList {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  at(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds.");
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  pop() {
    if (this.size === 0) {
      return null; 
    }
    if (this.size === 1) {
      const poppedNode = this.head;
      this.head = undefined;
      this.tail = undefined;
      this.size--;
      return poppedNode;
    }
    const secondToLastNode = this.at(this.size - 2);
    const poppedNode = this.tail;
    secondToLastNode.nextNode = undefined;
    this.tail = secondToLastNode;
    this.size--;
    return poppedNode;
  }

  toString() {
    if (this.size === 0) {
      return "null";
    }
    let currentNode = this.head;
    let string = "";
    while (currentNode) {
      string += `(${currentNode.data}) -> `;
      currentNode = currentNode.nextNode;
    }
    return string + "null";
  }

  contains(key) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data[0] === key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(key) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.data[0] === key) {
        return currentNode.data[1]; 
      }
      currentNode = currentNode.nextNode;
      index++;
    }
    return undefined;
  }

  insertValue(value, index) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds for insertion.");
    }
    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index === this.size) {
      this.append(value);
      return;
    }
    const nodeBefore = this.at(index - 1);
    const newNode = new Node(value);
    newNode.nextNode = nodeBefore.nextNode;
    nodeBefore.nextNode = newNode;
    this.size++;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds for removal.");
    }
    if (index === 0) {
      this.head = this.head.nextNode;
      if (this.size === 1) {
        this.tail = undefined;
      }
      this.size--;
      return;
    }
    if (index === this.size - 1) {
      this.pop();
      return;
    }
    const nodeBefore = this.at(index - 1);
    nodeBefore.nextNode = nodeBefore.nextNode.nextNode;
    this.size--;
  }

  getNode(key) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data[0] === key) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
    }
    return undefined;
  }
}

function hash(key, prime) {
  let hashCode = 0;
  const keyString = String(key);
  for (let i = 0; i < keyString.length; i++) {
    hashCode = (31 * hashCode + keyString.charCodeAt(i));
    hashCode = hashCode % prime; 
  }
  return hashCode % prime;
}

class HashMap {
  constructor() {
    const PRIME_NUMBER = 18681; 
    this.buckets = new Array(PRIME_NUMBER);
    this.loadFactor = 0.75
    this.capacity = PRIME_NUMBER; 
    this.currentSize = 0; 

    this.hash = (key) => hash(key, PRIME_NUMBER);
  }

  add(key, value) {
    const hashCode = this.hash(key);

    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = new LinkedList();
    }

    const existingNode = this.buckets[hashCode].getNode(key);
    if (existingNode) {
      console.log(`Key '${key}' already exists. Updating value.`);
      existingNode.data[1] = value; 
    } else {
      this.buckets[hashCode].append([key, value]);
      this.currentSize++;
    }


  }

  search(key) {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];

    if (!bucket) {
      console.log(`No data for key: '${key}' yet.`);
      return undefined; 
    } else {
      const value = bucket.find(key);
      if (value !== undefined) {
        console.log(`Found value for key '${key}':`, value);
        return value;
      } else {
        console.log(`Key '${key}' not found in the bucket.`);
        return undefined; 
      }
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];

    if (!bucket) {
      console.log(`Key '${key}' does not exist.`);
      return false; 
    }

    let currentNode = bucket.head;
    let previousNode = undefined;
    let index = 0;

    while (currentNode) {
      if (currentNode.data[0] === key) {
        if (previousNode) {
          previousNode.nextNode = currentNode.nextNode;
          if (!currentNode.nextNode) {
            bucket.tail = previousNode; 
          }
        } else {
          bucket.head = currentNode.nextNode;
          if (!currentNode.nextNode) {
          }
        }
        bucket.size--;
        this.currentSize--;
        console.log(`Key '${key}' removed successfully.`);
        return true;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      index++;
    }

    console.log(`Key '${key}' not found in the bucket.`);
    return false; 
  }
  
  keys() {
    const allKeys = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        let currentNode = bucket.head;
        while (currentNode) {
          currentNode = currentNode.nextNode;
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        let currentNode = bucket.head;
        while (currentNode) {
          allValues.push(currentNode.data[1]); 
          currentNode = currentNode.nextNode;
        }
      }
    }
    return allValues;
  }

  entries() {
    const allEntries = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        let currentNode = bucket.head;
        while (currentNode) {
          allEntries.push(currentNode.data); 
          currentNode = currentNode.nextNode;
        }
      }
    }
    return allEntries;
  }
}

