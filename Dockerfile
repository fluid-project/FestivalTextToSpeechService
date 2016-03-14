FROM inclusivedesign/nodejs

WORKDIR /etc/ansible/playbooks

COPY provisioning/* /etc/ansible/playbooks/

ENV INSTALL_DIR=/opt/FestivalTextToSpeechService

ENV EXTRA_VARS_FILE=vars-docker.yml

COPY . $INSTALL_DIR

RUN ansible-playbook playbook.yml --tags "install,configure,deploy"

CMD ["/usr/bin/supervisord"]
