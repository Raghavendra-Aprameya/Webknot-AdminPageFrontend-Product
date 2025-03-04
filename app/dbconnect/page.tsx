"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function DatabaseConnect() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    dbName: "",
    dbType: "",
    connectionString: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDbTypeSelect = (dbType) => {
    setFormData((prevState) => ({
      ...prevState,
      dbType,
      ...(dbType === "mongodb" && { username: "", password: "", dbName: "" }), // Reset unused fields for MongoDB
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dbType) {
      setError("Please select a database type");
      return;
    }

    if (formData.dbType === "mongodb" && !formData.connectionString) {
      setError("Please enter the MongoDB connection string");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/database-connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to connect to database");
      }

      setSuccess("Database connection successful!");
      // setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setError(
        err.message || "An error occurred while connecting to the database"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Database Connection</title>
        <meta name="description" content="Connect to your database" />
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Database Connection
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your database credentials to connect
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Database Type
              </label>
              <div className="flex space-x-4">
                {["postgres", "mysql", "mongodb"].map((db) => (
                  <button
                    key={db}
                    type="button"
                    onClick={() => handleDbTypeSelect(db)}
                    className={`flex-1 py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      formData.dbType === db
                        ? "bg-indigo-600 text-white border-transparent"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {db.charAt(0).toUpperCase() + db.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {formData.dbType === "mongodb" ? (
              <div>
                <label
                  htmlFor="connectionString"
                  className="block text-sm font-medium text-gray-700"
                >
                  MongoDB Connection String
                </label>
                <div className="mt-1">
                  <input
                    id="connectionString"
                    name="connectionString"
                    type="text"
                    required
                    value={formData.connectionString}
                    onChange={handleChange}
                    placeholder="mongodb+srv://user:password@cluster.mongodb.net/dbname"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Database Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Database Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dbName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Database Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="dbName"
                      name="dbName"
                      type="text"
                      required
                      value={formData.dbName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Connecting..." : "Connect to Database"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
