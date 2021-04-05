<div align="center">
  <h1>StrawCI</h1>
  <b>Warning:</b>
  <p>This is just a web prototype (both Frontend and Backend) built in Express and Mongoose (MongoDB)<br/>This prototype is not practical, sustainable or safe at all.<p>
</div>

## 🤖 What is StrawCI?
StrawCI is a project that allows the automation of the deployment of applications. This is based on 5 simple steps
1. Develop
2. Upload
3. Compile
4. Deploy
5. Notify

### 💻 Develop
At this stage the developer or developers create a project and develop it to such an extent that they want to deploy it, then to facilitate it they install StrawCI in their project.

### 📁 Upload
After the previous stage, this code is sent through a commit to a Git repository, then a server configured with StrawCI downloads that commit automatically.

### ⚙️ Compile
StrawCI prepares all the necessary things before deployment, these actions are previously defined by the developer. That is, if it is necessary to install libraries, update modules or compile the project, then StrawCI does it.

### 🚀 Deploy
Finally, StrawCI deploys the application automatically with a series of preconfigured steps (For example, in case the application or the server has to be restarted)

### 🔔 Notify
This stage is optional, but StrawCI can also be configured to send an email when the deployment was successful or otherwise an error occurred during it. This notification can be sent by mail or by a Webhook in JSON format.

## 📝 The project
This project was created to expedite the development of another project called <a href="https://github.com/dotmsn/">Dot</a>. In the same way, it will be open to the general public totally free.

Of course, you can also make a donation and send your support by following the "sponsor" links. This would help a lot to maintain the project.

## ❤️ The End
Made with Love by [Sammwy](https://twitter.com/sammwy)
