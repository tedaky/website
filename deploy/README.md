# Deploy

These deploy scripts are to help automate with a little manual work.

## Initiate

* Copy `initiate.sample.sh` to `initate.sh`
* Modify `SERVER` by changing `myappuser` to a user that has ssh access
* Modify `SERVER` by changing `yourserver.com` to the server address
* Modify `APP_DIR` to be the application directory on the server
* If the server is hosted by Amazon modify `KEYFILE` to be the key provided by Amazon
* Keep or modify `REMOTE_SCRIPT_PATH` where the automation script will be run from on the server
* Give execution permissions to `initate.sh`

## Work

* Copy `work.sample.sh` to `work.sh`
* Modify `APP_DIR` to be the application directory
* Modify `GIT_URL` to be the repository url
* Modify `RESTART_ARGS` to adding or removing commands
* Keep or modify `code` in the `if` statement to representing node directory source

## Run

You can run the script by `terminal` from the application root with `./deploy/initiate.sh`
