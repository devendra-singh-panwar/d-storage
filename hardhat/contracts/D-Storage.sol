// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract D_Storage {
    struct file {
        string fileCid;
        string fileName;
        string createdAt;
        string fileSize;
        string fileType;
        address[] approvals;
    }
    struct user {
        string[] files;
    }
    uint fileIndex = 0;
    mapping(address => user) users;
    mapping(string => file) allFiles;

    function uploadFile(
        string calldata _hash,
        string calldata _name,
        string calldata _size,
        string calldata _type,
        string calldata _timestamp
    ) public {
        address[] memory temp = new address[](0);
        allFiles[_hash] = file(_hash, _name, _timestamp, _size, _type, temp);
        users[msg.sender].files.push(_hash);
    }

    function approveAccess(address _address, string memory index) public {
        allFiles[index].approvals.push(_address);
    }

    function canAccess(string calldata index) public view returns (bool) {
        if (allFiles[index].approvals.length == 0) {
            return false;
        } else {
            for (uint i = 0; i < allFiles[index].approvals.length; i++) {
                if (allFiles[index].approvals[i] == msg.sender) {
                    return true;
                }
            }
            return false;
        }
    }

    function getFile(string memory index) public view returns (file memory) {
        return allFiles[index];
    }

    function getAllFiles() public view returns (file[] memory) {
        file[] memory allfile = new file[](users[msg.sender].files.length);
        for (uint i = 0; i < users[msg.sender].files.length; i++) {
            allfile[i] = (allFiles[users[msg.sender].files[i]]);
        }
        return allfile;
    }

    function getApprovals(
        string calldata index
    ) public view returns (address[] memory) {
        return allFiles[index].approvals;
    }
}
