#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

let userId: number;
let properties: any = {};
let final_select: string;
let payment: number;
let std_name:string ;
let balance: number; 

console.log(chalk.blueBright.italic(`\t \tWelcome to My Student Management System`))
async function mainMenu(){
    const answer = await inquirer.prompt(
        [
            {
                name:"firt_list", 
                message:chalk.italic("Hello in My Program"),
                type:"list",
                choices:["Add Student", "Select Courses", "Enroll Student","Show Status", "Exit"]
            }
        ]
    )

    switch(answer.firt_list){
        case 'Add Student':
            console.log(chalk.blueBright.italic(`\t \tAdd Student`));
            await addstudent()
            break;
            
            case 'Select Courses':
                console.log(chalk.blueBright.italic(`Please enter your user ID to select a course`));
                await verifyUserIdAndSelectCourse();

                break;

            case 'Enroll Student':
                console.log(chalk.blueBright.italic(`\t \tEnroll Student`));
                await verifyUserIdAndenrollstutdent()
                break;

            case 'Show Status':
                    console.log(chalk.blueBright.italic(`Show Status`));
                    await verifyUserIdAndshowstatus()
                    break;
                
            case "Exit":
                console.log("Exiting...");
                    // Exit the program or perform any cleanup
                process.exit();
            default:
                console.log("Invalid choice");
                    mainMenu();
                break;

    }
    mainMenu()
}


async function addstudent(){
    let std_Enrollment = await inquirer.prompt([
    {
        name: "enroll",
        message: "Enter Your Name",
        type: "input",
        validate: (input) => {
        if (input !== "" && isNaN(Number(input))) {
            return true;
        } else {
            if (input === "") {
                console.log(chalk.bgRed("Please provide Name"));
            } else {
                console.log(chalk.bgRed("Name cannot be a number"));
            }
                return false;
            }
        },
    },
    {
        name:"age",
        message:"Enter Your Age",
        type:"input"
    }
    ]);

    if(std_Enrollment.age >= 18){
        let std_info = await inquirer.prompt(
            [
                {
                    name:"std_nic",
                    message:"With Dashes '-' Nic does not consider. Enter Your Nic number: ",
                    type:"input",
                    validate:(input) => {
                        if(input.length === 13){
                            return true
                        }
                        else{
                            console.log(chalk.red(`Enter a Valid NIC Number!`))
                        }
                    }
                },
                {
                    name:"std_num",
                    message:"Enter Your Phone Number. Number Must be start on 03 not +92: ",
                    type:"input",
                    validate:(input) => {
                        if(input.length === 11){
                            return true
                        }
                        else{
                            console.log(chalk.red(`Enter a Valid Number!`))
                        }
                    }
                }
            ]
        )
    }
    else{
        let student_number = await inquirer.prompt(
            [
                {
                    name:"stud",
                    message:"Enter Your Phone Number. Number Must be start on 03 not +92: ",
                    type:"input",
                    validate:(input) => {
                        if(input.length === 11){
                            return true
                        }
                        else{
                            console.log(chalk.red(`Enter a Valid Number!`))
                        }
                    }
                }
            ]
        )
    }
    userId = Math.floor(Math.random() * 1000 + 11000);
    std_name = std_Enrollment.enroll
    console.log(chalk.greenBright.italic.bold(`Welcome ${std_name} and Your Student ID is ${userId}`));
}

async function verifyUserIdAndSelectCourse() {
    const userIdInput = await inquirer.prompt([
        {
            name: "userId",
            message: "Enter Your User ID",
            type: "input",
        }
    ]);

    if (Number(userIdInput.userId) === userId) {
        await selectcourse();
    } else {
        console.log(chalk.redBright ("User ID does not match"));
    }
}


async function selectcourse() {
    
    let platform = await inquirer.prompt([
    {
      name: "faculty",
      message: "Where do you learn?",
      type: "list",
      choices: ["Online", "Onsite"],
    },
  ]);

  if (platform.faculty === "Online") {
    let selectCourses = await inquirer.prompt([
      {
        name: "courses",
        message: "Select Your course: ",
        type: "list",
        choices: [
          "Website Designing",
          "Graphic Designing",
          "Social Media Marketing",
          "Search Engine Optimization (SEO)",
        ],
      },
    ]);

    final_select = selectCourses.courses;
    if (final_select === "Website Designing") {
        properties = {
          Duration: "3 months",
          Coursefee: "4000",
          Coursedescription: "HTML, CSS & JS",
        };
        console.log(properties);

    }
    else if (selectCourses.courses === "Graphic Designing") {
        properties = {
          Duration: "9 months",
          Coursefee: "6000",
          Coursedescription: "Photoshop, illustrator & Adobe",
        };
        console.log(properties);

    }

    else if (selectCourses.courses === "Social Media Marketing") {
        properties = {
            Duration: "15 months",
            Coursefee: "10000",
            Coursedescription:
            "Facebook Marketing, Instagram Marketing, LinkedIn Marketing, Twitter Marketing & Tik Tok Marketing",
          };
          console.log(properties);

    }

    else if (selectCourses.courses === "Search Engine Optimization (SEO)") {
        properties = {
            Duration: "6 months",
            Coursefee: "5000",
            Coursedescription: "On-Page SEO & Off-Page SEO",
      };
      console.log(properties);
    }
 }
 else if (platform.faculty === "Onsite") {
    let selectCourses = await inquirer.prompt([
      {
        name: "courses",
        message: "Select Your course: ",
        type: "list",
        choices: [
          "Python Programming",
          "English Language",
          "Freelancing",
          "MS Office",
        ],
      },
    ]);
    final_select = selectCourses.courses;
    if (final_select === "Python Programming") {
        let properties: any = {
          Duration: "12 months",
          Coursefee: "8000",
          Coursedescription: "Basic to Advance of Python Programming",
        };
        console.log(properties);

    }
    else if (selectCourses.courses === "English Language") {
        properties = {
            Duration: "4 months",
            Coursefee: "2000",
            Coursedescription: "Language",
          };
          console.log(properties);

    }
    else if (selectCourses.courses === "Freelancing") {
        properties = {
            Duration: "6 months",
        Coursefee: "5500",
        Coursedescription: "Fiver, Upwork & People Per Hour",
      };
      console.log(properties);
    }
    else if (selectCourses.courses === "MS Office") {
        properties = {
            Duration: "3 months",
        Coursefee: "2500",
        Coursedescription: "MS Word, Excel & Power Point",
    };
    console.log(properties);
    }
 }
}


async function verifyUserIdAndenrollstutdent() {
    const userIdInput = await inquirer.prompt([
        {
            name: "userId",
            message: "Enter Your User ID",
            type: "input",
        }
    ]);

    if (Number(userIdInput.userId) === userId) {
        await enrollstutdent();
    } else {
        console.log(chalk.redBright ("User ID does not match"));
    }
}
async function enrollstutdent() {
    console.log(`You Enrolled in this course ${final_select}. Please Proceed to Pay....`)
    await payfees()
}



async function payfees() {
    console.log(chalk.red(`Hello And Pay fee`))
    let fees = await inquirer.prompt([
        {
          name: "course_fee",
          message: "Select Your Payment Criteria",
          type: "list",
          choices: ["Easy Paisa", "Jazz Cash", "Bank Account"],
        },
    ]);

    if (fees.course_fee === "Easy Paisa") {
        let getinfoforep = await inquirer.prompt([
          {
            name: "epinfo",
            message: "Enter Your Mobile Number",
            type: "input",
          },
        ]);

        if (getinfoforep.epinfo.length === 11) {
          let payep = await inquirer.prompt([
            {
              name: "eppay",
              message: "Enter Your Amount",
              type: "input"
            },
          ]);

          let payment = parseInt(payep.eppay);
            if (isNaN(payment) || payment < properties.Coursefee) {
                console.log(`Enter a Valid Amount!`);
            } else {
                balance = payep.eppay - properties.Coursefee;
                console.log(`Your balance amount is: ${balance}`);
            }
        } else {
          console.log(`Enter a Valid Number!`);
        }
    }

    else if (fees.course_fee === "Jazz Cash") {
        let getinfoforjz = await inquirer.prompt([
          {
            name: "jzinfo",
            message: "Enter Your Mobile Number",
            type: "input",
          },
        ]);

        if (getinfoforjz.jzinfo.length === 11) {
          let payjz = await inquirer.prompt([
            {
              name: "jzpay",
              message: "Enter Your Amount",
              type: "input",
            },
          ]);

          let payment = parseInt(payjz.jzpay);
            if (isNaN(payment) || payment < properties.Coursefee) {
                console.log(`Enter a Valid Amount!`);
            } else {
                balance = payjz.jzpay - properties.Coursefee;
                console.log(`Your balance amount is: ${balance}`);
            }
        } else {
          console.log(`Enter a Valid Number!`);
        }
      }

      else if (fees.course_fee === "Bank Account") {
        let getinfoforba = await inquirer.prompt([
          {
            name: "bainfo",
            message: "Enter Your Account Number",
            type: "input",
          },
        ]);

        if (getinfoforba.bainfo.length <= 15) {
          let payba = await inquirer.prompt([
            {
              name: "bapay",
              message: "Enter Your Amount",
              type: "input",
            },
          ]);

          let payment = parseInt(payba.bapay);
          if (isNaN(payment) || payment < properties.Coursefee) {
              console.log(`Enter a Valid Amount!`);
          } else {
              let balance = payba.bapay - properties.Coursefee;
              console.log(`Your balance amount is: ${balance}`);
          }
        } else {
          console.log(`Enter a Valid Number!`);
        }
      }
}
async function verifyUserIdAndshowstatus() {
    const userIdInput = await inquirer.prompt([
        {
            name: "userId",
            message: "Enter Your User ID",
            type: "input",
        }
    ]);

    if (Number(userIdInput.userId) === userId) {
        await showStatus();
    } else {
        console.log(chalk.redBright ("User ID does not match"));
    }
}

async function showStatus(){
    console.log(chalk.greenBright(`Details {Student Name is: ${std_name}.\nStudent ID is: ${userId}. ${std_name} enrolled in ${final_select} and Your balance amount is ${balance}}`));

}

mainMenu()