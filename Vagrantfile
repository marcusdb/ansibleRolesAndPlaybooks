


Vagrant.configure(2) do |config|

  config.vm.define "queue1" do |queue1|
    queue1.vm.box = "ubuntu/trusty64"
    queue1.vm.network :private_network, ip:"192.168.50.2"
    queue1.vm.synced_folder ".", "/vagrant", :nfs => { :mount_options => ["dmode=777","fmode=777"] }
    queue1.vm.provider "virtualbox" do |vb|
      vb.memory = 2048
      vb.cpus = 1
      # change the network card hardware for better performance
      vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
      vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]

      # suggested fix for slow network performance
      # see https://github.com/mitchellh/vagrant/issues/1807
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]      
    end
  end

  config.vm.define "queue2" do |queue2|
    queue2.vm.box = "ubuntu/trusty64"
    queue2.vm.network :private_network, ip:"192.168.50.3"
    queue2.vm.synced_folder ".", "/vagrant", :nfs => { :mount_options => ["dmode=777","fmode=777"] }
    queue2.vm.provider "virtualbox" do |vb|
      vb.memory = 2048
      vb.cpus = 1
      # change the network card hardware for better performance
      vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
      vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]

      # suggested fix for slow network performance
      # see https://github.com/mitchellh/vagrant/issues/1807
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]      
    end
  end

  config.vm.define "stats" do |stats|
    stats.vm.box = "ubuntu/trusty64"
    stats.vm.network :private_network, ip:"192.168.50.1"
    stats.vm.network "forwarded_port", guest: 8082, host: 8082
    stats.vm.network "forwarded_port", guest: 5601, host: 5601
    stats.vm.network "forwarded_port", guest: 9200, host: 9200
    stats.vm.network "forwarded_port", guest: 3000, host: 3000    
    stats.vm.synced_folder ".", "/vagrant", :nfs => { :mount_options => ["dmode=777","fmode=777"] }
    stats.vm.provider "virtualbox" do |vb|
      vb.memory = 2048
      vb.cpus = 1
      # change the network card hardware for better performance
      vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
      vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]

      # suggested fix for slow network performance
      # see https://github.com/mitchellh/vagrant/issues/1807
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]      
    end
  end
  


  


  if Vagrant.has_plugin?("vagrant-cachier")
    # Configure cached packages to be shared between instances of the same base box.
    # More info on http://fgrehm.viewdocs.io/vagrant-cachier/usage
    config.cache.scope = :box

    # OPTIONAL: If you are using VirtualBox, you might want to use that to enable
    # NFS for shared folders. This is also very useful for vagrant-libvirt if you
    # want bi-directional sync
    config.cache.synced_folder_opts = {
      type: :nfs,
      # The nolock option can be useful for an NFSv3 client that wants to avoid the
      # NLM sideband protocol. Without this option, apt-get might hang if it tries
      # to lock files needed for /var/cache/* operations. All of this can be avoided
      # by using NFSv4 everywhere. Please note that the tcp option is not the default.
      mount_options: ['rw', 'vers=3', 'tcp', 'nolock']
    }
    # For more information please check http://docs.vagrantup.com/v2/synced-folders/basic_usage.html
  end

end
