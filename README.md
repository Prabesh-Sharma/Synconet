-----------------------Initializing--------------------------------------
1. Clone the Repository:
Clone the remote repository to your local machine. This creates a local copy of the repository where you can work on your changes.
Command: git clone https://github.com/<your-username>/<your-repo>.git

--------------------Installing packages locally----------------------
cd synconet/
cd server/
npm install
cd ..
cd client/
npm install



3. Create Your Own Branch Locally:
Create a new branch for your feature and switch to it. This helps avoid working directly on the master branch.
Command: git checkout -b <your-branch-name>


4. Add the Branch to the Remote Repository:
Push your newly created branch to the remote repository and set up tracking. This allows you to easily push and pull changes to and from this branch in the future.
Command: git push -u origin <your-branch-name>


5. Make Changes and Stage Them:
After making your changes, stage them for commit. This prepares your changes to be included in the next commit.
Command: git add .


6. Commit Your Changes:
Commit the staged changes with a descriptive message. This creates a snapshot of your changes in the repository's history.
Command: git commit -m "Your commit message"


7. Push Your Changes to the Remote Branch:
Push your committed changes to the remote branch. This shares your changes with the team.
Command: git push

----------------------------------------Syncing------------------------------------------------------

8. Switch to Your Feature Branch:
If you’re not already on your feature branch, switch to it. This ensures that you’re working on the correct branch.
Command: git checkout <your-branch-name>



9. Fetch the Latest Changes from the Remote:
Fetch updates from the remote repository. This downloads the latest changes without merging them into your current branch.
Command: git fetch origin



10. Merge the Latest Changes from Master into Your Branch:
Merge the latest changes from the master branch into your feature branch. This helps keep your branch up to date with the main codebase.
Command: git merge origin/master


Alternatively, you can use git rebase origin/master for a cleaner commit history.
Push Your Updated Feature Branch:
After syncing, push your updated branch back to the remote repository. If you used rebase, you may need to force-push your changes.
Command: git push (or git push --force if rebased)



----------------------------------------Merging--------------------------------
11. Switch to the Master Branch:
Use this command to switch to the master branch, where you want to merge your changes.
Command: git checkout master



12. Pull the Latest Changes from the Remote Master:
This command updates your local master branch with the latest changes from the remote repository.
Command: git pull origin master


13. Merge Your Feature Branch into Master:
This command merges the changes from your feature branch into the master branch.
Command: git merge <your-branch-name>


14. Push the Updated Master to the Remote:
After merging, you need to push the updated master branch back to the remote repository.
Command: git push origin master



15. Deleting
Delete the Branch from the Remote:
If your feature branch is no longer needed, you can delete it from the remote repository.
Command: git push origin --delete <your-branch-name>



16. Delete the Local Branch:
After deleting the branch from the remote, you can also delete your local branch to clean up your workspace.
Command: git branch -d <your-branch-name>



--------------------------------useful-----------------------------------------------------------
17. git branch -vv
