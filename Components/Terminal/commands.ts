import { CommandResult, NewLine } from "./types";

export const INITIAL_LINES: NewLine[] = [
  { type: "success", content: "Welcome to Amine Cheffak's Terminal." },
  { type: "output", content: "Full Stack Developer | Backend Developer" },
  { type: "output", content: 'Type "help" to see available commands.' },
];

export const COMMAND_NAMES = [
  "help",
  "about",
  "whoami",
  "skills",
  "stack",
  "projects",
  "education",
  "experience",
  "linux",
  "docker",
  "git",
  "github",
  "jira",
  "uml",
  "contact",
  "hostname",
  "pwd",
  "ls",
  "date",
  "history",
  "neofetch",
  "banner",
  "clear",
];

const one = (type: NewLine["type"], content: string): CommandResult => ({
  lines: [{ type, content }],
});

const TEXTS = {
  help: `Available commands:

help          - Show available commands
about         - About me
whoami        - Display my identity
skills        - Technical skills
stack         - Technology stack
projects      - My projects
education     - Education
experience    - Experience
linux         - Linux environment
docker        - Docker information
git           - Git information
github        - GitHub profile
jira          - Project management
uml           - UML & modeling
contact       - Contact information
hostname      - Current hostname
pwd           - Current directory
ls            - List files
date          - Current date
history       - Command history
echo <text>   - Print text
clear         - Clear terminal
banner        - Display banner
neofetch      - System information
sudo hire amine - Hire me`,

  about: `Hello! I'm Amine Cheffak.

I'm a Full Stack Development student at ISTA NTIC Safi, Morocco.

I enjoy building web applications, designing backend architectures,
working with databases, and exploring Linux and DevOps.

Currently improving my skills in backend development,
Docker, system design, and AI technologies.`,

  skills: `Technical Skills:

Frontend:
  React.js
  Next.js
  TypeScript
  Tailwind CSS

Backend:
  Spring Boot
  Node.js
  Express.js
  NestJS
  Laravel

Database:
  MySQL
  MongoDB
  Mariadb

Tools:
  Git / GitHub
  Docker
  Linux
  Aws
  VS Code`,

  stack: `My Technology Stack:

React.js       Next.js
TypeScript     JavaScript
Spring Boot    Express.js
NestJS         Laravel
MySQL          Mariadb
MongoDB        Docker
Linux          Git
AWS            C
GitHub         VS Code
Jira           UML
Sql            NoSQL
`,

  projects: `Personal Projects:

01. E-Commerce Application
    Spring Boot, React, MySQL, Docker , Aws
    Production : https://competing-handbags-proof-obligation.trycloudflare.com/

02. Project Management Application
    React, TypeScript, NestJS
    Privite Project 

03. Banking Application
    python, csv , json
    link Repositories : https://github.com/AmineCheffak/Bank-Application-Amine-Cheffak-Mohammad-El-Jaid

04. Portfolio Website
    Next.js, TypeScript, Tailwind CSS
    Production : https://aminecheffak.vercel.app/
`,
  education: `Education:

ISTA NTIC Safi
Development Digital - Full Stack
2025 - 2027

University Studies
Applied Computer Science`,

  experience: `Experience:

Currently looking for a PFE internship.

Interested in:
- Backend Development
- Full Stack Development
- REST API Development
- Database Design
- Docker & Deployment`,

  linux: `Linux Environment:

OS: Kubuntu 26.04
Desktop: KDE Plasma
Shell: Zsh
Terminal: Konsole
Editor: VS Code
Architecture: x86_64

Linux is my daily development environment.`,

  docker: `Docker:

Containerization
Docker Compose
Docker Images
Multi-container Applications
Container Networking
Volumes
Deployment

I use Docker to containerize and deploy applications.`,

  git: `Git Commands:

git init
git add .
git commit -m "message"
git push
git pull
git branch
git merge

Version control is part of my daily workflow.`,

  github: `GitHub Profile:

Username: AmineCheffak

GitHub:
https://github.com/AmineCheffak`,

  jira: `Project Management:

Jira
Agile
Scrum
Sprint Planning
Task Management
Team Collaboration`,

  uml: `Modeling Skills:

UML Diagrams
Use Case Diagram
Class Diagram
Sequence Diagram
Activity Diagram
Merise`,

  contact: `Contact Information:

Email:
a.cheffak6604@uca.ac.ma

GitHub:
github.com/AmineCheffak

Portfolio:
aminecheffak-dev.vercel.app`,

  banner: `
    _    __  __ ___ _   _ _____
   / \\  |  \\/  |_ _| \\ | | ____|
  / _ \\ | |\\/| || ||  \\| |  _|
 / ___ \\| |  | || || |\\  | |___
/_/   \\_\\_|  |_|___|_| \\_|_____|

       AMINE CHEFFAK
       FULL STACK DEVELOPER
`,

  neofetch: `       .--.          amine@developer
      |o_o |         ----------------
      |:_/ |         OS: Kubuntu 26.04
     //   \\ \\        Host: HP EliteBook
    (|     | )       Kernel: Linux
   /'\\_   _/\`\\       Shell: zsh
   \\___)=(___/       Editor: VS Code

                     Role: Full Stack Developer
                     Location: Safi, Morocco`,

  hire: `ACCESS GRANTED!

Thank you for your interest.

Let's build something amazing together!

Contact:
a.cheffak6604@uca.ac.ma`,
};

export function runCommand(
  mainCommand: string,
  argument: string,
  history: string[]
): CommandResult {
  switch (mainCommand) {
    case "help":
      return one("success", TEXTS.help);

    case "whoami":
      return {
        lines: [
          { type: "success", content: "amine@developer:~$ Amine Cheffak" },
          {
            type: "output",
            content: "Full Stack Developer | Backend Developer | IT Student",
          },
        ],
      };

    case "about":
      return one("output", TEXTS.about);
    case "skills":
      return one("success", TEXTS.skills);
    case "stack":
      return one("output", TEXTS.stack);
    case "projects":
      return one("success", TEXTS.projects);
    case "education":
      return one("output", TEXTS.education);
    case "experience":
      return one("output", TEXTS.experience);
    case "linux":
      return one("success", TEXTS.linux);
    case "docker":
      return one("output", TEXTS.docker);
    case "git":
      return one("output", TEXTS.git);
    case "github":
      return one("success", TEXTS.github);
    case "jira":
      return one("output", TEXTS.jira);
    case "uml":
      return one("output", TEXTS.uml);
    case "contact":
      return one("success", TEXTS.contact);
    case "banner":
      return one("success", TEXTS.banner);
    case "neofetch":
      return one("success", TEXTS.neofetch);

    case "hostname":
      return one("output", "amine-dev");

    case "pwd":
      return one("output", "/home/amine");

    case "ls":
      return one(
        "success",
        "about.txt  skills/  projects/  education/  contact.txt  README.md"
      );

    case "date":
      return one("output", new Date().toString());

    case "history":
      return history.length === 0
        ? one("error", "No command history.")
        : one(
            "output",
            history.map((item, index) => `${index + 1}  ${item}`).join("\n")
          );

    case "echo":
      return one("output", argument);

    case "sudo":
      return argument === "hire amine"
        ? one("success", TEXTS.hire)
        : one("error", "Permission denied: command not found.");

    case "clear":
      return { lines: [], action: "clear" };

    case "exit":
      return { lines: [], action: "exit" };

    default:
      return one(
        "error",
        `Command not found: ${mainCommand}

Type "help" to see available commands.`
      );
  }
}