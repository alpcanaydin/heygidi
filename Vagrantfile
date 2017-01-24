# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "private_network", ip: "192.168.31.12"

  config.vm.provider "virtualbox" do |vb|
      vb.memory = "4096"
  end
end
