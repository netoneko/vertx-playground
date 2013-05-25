# -*- mode: ruby -*-
# vi: set ft=ruby :

BOX_NAME = "precise"
BOX_URL  = "http://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box"

Vagrant.configure("2") do |config|
  config.vm.box     = ENV.fetch("VAGRANT_BOX",     BOX_NAME)
  config.vm.box_url = ENV.fetch("VAGRANT_BOX_URL", BOX_URL)

  config.vm.provision :shell, inline: <<-EOF
    sudo add-apt-repository -y ppa:webupd8team/java
    sudo apt-get update -y

    echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
    echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections

    sudo apt-get install -y oracle-java8-installer --quiet

    curl -L -s http://vert-x.github.io/vertx-downloads/downloads/vert.x-1.3.1.final.tar.gz | tar zxv
  EOF

  config.vm.define 'testbox' do |v|
    v.vm.network :private_network, ip: "192.168.38.39"
    v.vm.hostname = "testbox.vagrant"
  end

  config.vm.provider :virtualbox do |vbox|
    # vbox.customize ["modifyvm", :id, "--cpus", 2] # more juice
    vbox.customize ["modifyvm", :id, "--cpuexecutioncap", 50]
    vbox.customize ["modifyvm", :id, "--pae", "on"]
    vbox.customize ["modifyvm", :id, "--ioapic", "on"]
    vbox.customize ["modifyvm", :id, "--acpi", "off"]
    vbox.customize ["modifyvm", :id, "--hwvirtex", "on"]
    vbox.customize ["modifyvm", :id, "--vrde", "off"]
    vbox.customize ["modifyvm", :id, "--memory", 256]
  end

  config.vm.synced_folder ".", "/home/vagrant/vertx-playground"
end
