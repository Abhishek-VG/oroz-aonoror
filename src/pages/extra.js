function x(cb) {
  try {
    cb();
    console.log("callback execeeuted scucsfully");
  } catch (err) {
    console.log("catch", err);
  } finally {
    console.log("finally");
  }
  console.log("FE");
}

function cl() {
    console.log(1);
    return 2;
    console.log(3);
}
cl()

function cl2() {
    try {
       console.log("T")
       return 2; 
    } catch(err){
        console.log("C")
        return 3;
    } finally {
        console.log("F")
        return 4;
    }
   
}
console.log(cl2())

function cl3() {
    try {
       console.log("T")
       return 2; 
    } catch(err){
        console.log("C")
        return 3;
    } finally {
        console.log("F")
    }
   
}
console.log(cl3())

function cl4() {
    try {
       return 2; 
       throw new Error("I want error");
    } catch(err){
        console.log("C")
        return 3;
    } finally {
        console.log("F")
    }
   return 5;
}
console.log(cl4())