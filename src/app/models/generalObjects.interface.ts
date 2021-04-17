export default interface generalObjects{
    id:string;
    name:string;
}

export const difficulties:string[]=[
    "easy","medium","hard"
  ]

export const types:generalObjects[]=[
    {id:"multiple",name:"Multiple Choice"},
    {id:"boolean",name:"True / False"}
  ]