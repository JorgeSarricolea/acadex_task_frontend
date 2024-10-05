## Getting Started

First, you need to run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page will automatically update as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Workflow

1. First, identify which branch you are currently on. It is helpful to give branches meaningful names. To check which branch you’re on, use the following command:

```bash
git branch
```

2. For instance, if you worked on the login feature, your branch might be called "login." To ensure you have the latest version of the complete application, run the following command:

```bash
git pull origin main
```

> [!TIP]
> This command will pull all the latest changes, ensuring that you do not run into conflicts or lose any changes when you push your updates.

> [!WARNING]
> In case of conflicts, Git will indicate which files are causing the conflicts. You will need to decide whether to accept the incoming changes or keep your current ones. Incoming changes are the newly pulled updates, while current changes are those already present in your local workspace.

3. If everything goes smoothly and there are no conflicts, you will receive all updates from the `main` branch. Now, it’s time to push your updated branch to the remote repository using the following command:

```bash
# Replace login-branch with the actual name of the branch you are working on
git push login-branch
```

> [!WARNING]
> Make sure all of your changes are committed before pushing them.

4. After pushing your branch, navigate to GitHub, where you should see a notification, usually highlighted in yellow. At this point, click on the green button that says "Compare and Pull Request." You may also refer to an image attached below for easier identification.

![Example of a PR detected on GitHub](/src/app/assets/img/pr_example.png)

5. After clicking "Compare and Pull Request," an editor will open, prompting you to write a title and description for the Pull Request (PR). This helps explain the changes made and their importance.

Here is an example of a possible title and description:

**Title:**
"Add login feature and authentication flow"

**Description:**
"This PR adds the login feature, including user authentication using email and password. It uses NextAuth for session handling and implements input validation to prevent invalid entries. This is the first step towards providing user-specific content within the application."

> [!WARNING]
> Make sure that you are creating the PR from the branch you worked on to the `main` branch to prevent incorrect merges or other issues. Refer to the attached image for visual guidance.

An illustrative image of the PR editor screen is attached below to help clarify the process further.

![Example of a PR detected on GitHub](/src/app/assets/img/pr_example_2.webp)

6. Once you have filled out the title and description and clicked the submit button, the Pull Request (PR) will be created. Now, you just need to wait for the repository administrator to either accept or reject it.

> [!TIP]
> If the administrator **accepts** the PR, it means that there were no conflicts, and your changes have been successfully merged into the `main` branch. However, if the PR is **rejected**, this usually means there are conflicts that need to be resolved before merging. In such cases, you will have to resolve these conflicts and then resubmit the PR for review.
