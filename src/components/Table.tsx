"use client";
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { debounce } from './Debounce';

const DynamicTable = () => {
  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
      name: string;
    };
  };

  const [userData, setUserData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<boolean>(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>(
        `https://jsonplaceholder.typicode.com/users`
      );
      setUserData(response.data);
      setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchUser = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      const filtered = userData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setSearch(true);
    } else {
      setFilteredData(userData);
      setSearch(false);
    }
  };

  // Debounce function for search
  const debouncedFetchSearchUser = useCallback(debounce(fetchSearchUser, 500), [userData]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-3 -ml-2 mt-3">
      <div>
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => debouncedFetchSearchUser(e.target.value)}
          className="w-1/3 bg-white dark:bg-gray-900 p-2 rounded-md shadow-sm ml-2"
        />
      </div>

      {!loading ? (
        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead className="w-[100px]">Phone</TableHead>
              <TableHead className="w-[100px]">Website</TableHead>
              <TableHead className="w-[100px]">Company</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(search ? filteredData : userData).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="font-medium">{user.phone}</TableCell>
                <TableCell className="font-medium">{user.website}</TableCell>
                <TableCell className="font-medium">{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-bold">Total</TableCell>
              <TableCell className="font-bold">{filteredData.length} Users</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <p>Loading...</p> // Add a loading message or spinner here
      )}
    </div>
  );
};

export default DynamicTable;
