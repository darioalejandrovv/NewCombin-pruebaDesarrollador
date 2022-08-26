class MemberService {
  constructor (){
  }
  validSSN (ssn){
    const regex = /^\d{3}-\d{2}-\d{4}$/;
    if (regex.test(ssn) === false) {
      return false
    }
    else {
      return true
    }
  }
}

module.exports = MemberService;

