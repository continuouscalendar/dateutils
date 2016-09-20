#!/bin/bash
set -e
current_dir=$(pwd)
cd $(dirname $0)
old_version=$(git tag | tail -n1)
version=$1
npm test
update_version() { sed  -i '' -E "s/(\"version\".*:.*\").*(\".*)/\1$version\2/g" $@; }
update_version src/index.js
npm install
npm release
#TODO create js documentation
#/usr/local/share/npm/lib/node_modules/doxx/bin/doxx --source ./src/main --target ./docs
if [ "$version" = "" ]
then
	echo "Version information not found. Type ./release.sh <version>"
	echo "Previous version was $old_version"
else
	echo "Creating version $version"
	update_version package.json
	echo -e "h3. $version \n\n$PLEASE EDIT:\n$(git log --pretty=format:%s $old_version^..)\n\n$(cat History.textile)" > History.textile
	vim History.textile
	git add -A .
	git commit -m "Build for version $version"
	git tag $version
	git status
	echo "Now type:"
	echo "git push "
	echo "git push --tags"
	echo "npm publish"
	echo "git co gh-pages && git merge master && git push && git co master"
fi
cd $current_dir



