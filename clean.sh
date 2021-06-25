############################################
# re-transpile typescript files in src dir #
############################################
cd dist
mv ./.env ../.moved.env
rm -rf ./* 1>&1 2>&2
tsc 1>&1 2>&2
mv ../.moved.env ./.env
ls -lah 1>&1
echo "completed"
