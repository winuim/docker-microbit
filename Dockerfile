FROM alpine:latest

RUN set -x && apk update && apk add \
    socat \
    && rm -rf /var/cache/apk/*

ENTRYPOINT [ "socat" ]
CMD ["-v", "-d", "-d", "tcp-listen:54321,reuseaddr,fork", "/dev/ttyACM0,raw,b115200,nonblock,waitlock=/var/run/ttyACM0.lock"]
