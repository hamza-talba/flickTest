import { FormGroup } from "@angular/forms";

export default function checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
  
    return password === repeatPassword ? null : { notSame: true }     
  }