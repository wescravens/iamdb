PORTS=(4632 35729 27017)

for i in PORTS; do
VBoxManage modifyvm "iamdb-dev" --natpf1 "tcp-port$i,tcp,,$i,,$i";
VBoxManage modifyvm "iamdb-dev" --natpf1 "udp-port$i,udp,,$i,,$i";
done
