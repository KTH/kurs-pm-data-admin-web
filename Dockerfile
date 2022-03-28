FROM kthse/kth-nodejs:16.0.0
LABEL maintainer="KTH-studadm studadm.developers@kth.se"

WORKDIR /application
ENV NODE_PATH /application

ENV TZ Europe/Stockholm
# Copy files used by Gulp.
COPY ["config", "config"]
COPY ["public", "public"]
COPY ["tinymce", "tinymce"]
COPY ["i18n", "i18n"]
COPY [".babelrc", ".babelrc"]
COPY [".eslintrc", ".eslintrc"]
COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]

# Copy source files, so changes does not trigger gulp.
COPY ["app.js", "app.js"]
COPY ["server", "server"]
COPY ["build.sh", "build.sh"]
COPY ["webpack.config.js", "webpack.config.js"]

RUN apk stats && \
    chmod a+rx build.sh && \
    apk add --no-cache bash && \
    apk add --no-cache --virtual .gyp-dependencies python2 make g++ util-linux && \
    npm ci --unsafe-perm && \
    npm run build && \
    npm prune --production && \
    apk del .gyp-dependencies && \
    apk stats

EXPOSE 3000

CMD ["node", "app.js"]