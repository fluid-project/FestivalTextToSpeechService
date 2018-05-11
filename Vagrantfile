# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

vars = YAML.load_file("provisioning/vars.yml")
vagrant_vars = YAML.load_file("provisioning/vars-vagrant.yml")

app_name = vars["nodejs_app_name"]

app_directory = vagrant_vars["nodejs_app_install_dir"]

app_start_script = vars["nodejs_app_start_script"]

# Check for the existence of the 'VM_HOST_TCP_PORT' environment variable. If it
# doesn't exist and 'nodejs_app_tcp_port' is defined in vars.yml then use that
# port. Failing that use defaults provided in this file.
host_tcp_port = ENV["VM_HOST_TCP_PORT"] || vars["nodejs_app_tcp_port"] || 8083
guest_tcp_port = vars["nodejs_app_tcp_port"] || 8083

# By default this VM will use 2 processor cores and 2GB of RAM. The 'VM_CPUS' and
# "VM_RAM" environment variables can be used to change that behaviour.
cpus = ENV["VM_CPUS"] || 1
ram = ENV["VM_RAM"] || 1024

Vagrant.configure(2) do |config|

  config.vm.box = "inclusivedesign/centos7"

  # Your working directory will be synced to /home/vagrant/sync in the VM.
  config.vm.synced_folder ".", "#{app_directory}"

  # List additional directories to sync to the VM in your "Vagrantfile.local" file
  # using the following format:
  # config.vm.synced_folder "../path/on/your/host/os/your-project", "/home/vagrant/sync/your-project"

  if File.exist? "Vagrantfile.local"
    instance_eval File.read("Vagrantfile.local"), "Vagrantfile.local"
  end

  # Port forwarding takes place here. The 'guest' port is used inside the VM
  # whereas the 'host' port is used by your host operating system.
  config.vm.network "forwarded_port", guest: guest_tcp_port, host: host_tcp_port, protocol: "tcp",
    auto_correct: true

  # Port 19531 is needed so logs can be viewed using systemd-journal-gateway
  #config.vm.network "forwarded_port", guest: 19531, host: 19531, protocol: "tcp",
  #  auto_correct: true

  config.vm.hostname = app_name

  config.vm.provider :virtualbox do |vm|
    vm.customize ["modifyvm", :id, "--memory", ram]
    vm.customize ["modifyvm", :id, "--cpus", cpus]
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo ansible-galaxy install -fr #{app_directory}/provisioning/requirements.yml
    sudo EXTRA_VARS_FILE=vars-vagrant.yml PYTHONUNBUFFERED=1 ansible-playbook #{app_directory}/provisioning/playbook.yml --tags="install,configure,deploy"
  SHELL

end
