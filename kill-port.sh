if [ $1 ]
then
    # -n hide host name，
    # -P hide port alias
    # -i filter info
    # grep: globally regular expression and print, check LISTEN mode
    if [ $(lsof -nP -iTCP:$1 | grep LISTEN | awk '{print $2;}') ]
    then
        kill -9 $(lsof -nP -iTCP:$1 |grep LISTEN|awk '{print $2;}')
        echo "Port Shut Down $1 Successfully"
    else
        echo "Port $1 is not at service"
    fi
else
    echo "Port Is Required!"
fi
